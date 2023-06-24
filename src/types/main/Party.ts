import { randomUUID, UUID } from "crypto";

import parties from "@parties";
import User, { UserClientType } from "@User";

import log from "../../utils/log";

export default class Party {
	public static exists(id: UUID): boolean {
		return parties[id] !== undefined;
	}
	public static get(id: UUID): Party {
		return parties[id];
	}

	private readonly _id: UUID;
	public get id(): UUID {
		return this._id;
	}

	private readonly _name: string;
	public get name(): string {
		return this._name;
	}

	// TODO: Implement a more secure password system in the future.
	private readonly _password: Nullable<string> = null;
	public get hasPassword(): boolean {
		return this._password !== null;
	}

	private _desktopUser: Nullable<User> = null;
	public get desktopUser(): Nullable<User> {
		return this._desktopUser;
	}

	private _mobileUser: Nullable<User> = null;
	public get mobileUser(): Nullable<User> {
		return this._mobileUser;
	}

	public get connectedUsers(): User[] {
		return [this._desktopUser, this._mobileUser].filter(
			user => user !== null
		) as User[];
	}

	public get connectedUsersAsClientTypes(): UserClientType[] {
		const connectedUsersClientTypes =
			this.connectedUsers.map(user => user.clientType);

		return connectedUsersClientTypes.filter(
			clientType => clientType !== null
		) as UserClientType[];
	}

	private _destroyOnNoConnectedUsers: boolean = true;
	public get destroyOnNoConnectedUsers(): boolean {
		return this._destroyOnNoConnectedUsers;
	}
	public set destroyOnNoConnectedUsers(value: boolean) {
		this._destroyOnNoConnectedUsers = value;

		if (
			this._destroyOnNoConnectedUsers &&
			this.connectedUsers.length === 0
		) {
			this.destroy();
		}
	}

	private _isDestroyed: boolean = false;
	public get isDestroyed(): boolean {
		return this._isDestroyed;
	}

	public constructor(
		partyName: string,
		password: Nullable<string> = null
	) {
		do {
			this._id = randomUUID();
		} while (Party.exists(this._id));

		parties[this._id] = this;

		log(`Created party with id ${this._id}`);

		this._password = password;
		this._name = partyName;
	}

	public destroy() {
		this._desktopUser?.leaveParty();
		this._mobileUser?.leaveParty();

		log(`Destroyed party with id ${this._id}`);

		delete parties[this._id];

		this._isDestroyed = true;
	}

	public addUser(user: User): boolean {
		switch (user.clientType) {
			case "desktop": {
				if (this._desktopUser !== null) {
					return false;
				}

				log(
					`Desktop User ${user.id} joined party ${this.id}`
				);

				this._desktopUser = user;
				return true;
			}
			case "mobile": {
				if (this._mobileUser !== null) {
					return false;
				}

				log(
					`Mobile User ${user.id} joined party ${this.id}`
				);

				this._mobileUser = user;
				return true;
			}
			default:
				return false;
		}
	}

	public removeUser(user: User) {
		if (user === this._desktopUser) {
			log(
				`Desktop User with id ${user.id} left party with id ${this.id}`
			);

			this._desktopUser = null;
		} else if (user === this._mobileUser) {
			log(
				`Mobile User with id ${user.id} left party with id ${this.id}`
			);

			this._mobileUser = null;
		}

		if (
			this._destroyOnNoConnectedUsers &&
			this.connectedUsers.length === 0
		) {
			this.destroy();
		}
	}

	public isCorrectPassword(password: string): boolean {
		return this._password === password;
	}
}
