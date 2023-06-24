import { randomUUID, UUID } from "crypto";

import parties from "@parties";
import User, { UserClientType } from "@User";
import config from "@config";

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

	private readonly _name: string;
	public get name(): string {
		return this._name;
	}

	// TODO: Implement a more secure password system in the future.
	private readonly _password: Nullable<string> = null;
	public get hasPassword(): boolean {
		return this._password !== null;
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

		if (config.debug) {
			console.log(`Created party ${this._id}`);
		}

		this._password = password;
		this._name = partyName;
	}

	public destroy() {
		this._desktopUser?.leaveParty();
		this._mobileUser?.leaveParty();

		if (config.debug) {
			console.log(`Destroyed party ${this._id}`);
		}

		delete parties[this._id];

		this._isDestroyed = true;
	}

	public addUser(user: User): boolean {
		switch (user.clientType) {
			case "desktop": {
				if (this._desktopUser !== null) {
					return false;
				}

				if (config.debug) {
					console.log(
						`Desktop User ${user.id} joined party ${this.id}`
					);
				}

				this._desktopUser = user;
				return true;
			}
			case "mobile": {
				if (this._mobileUser !== null) {
					return false;
				}

				if (config.debug) {
					console.log(
						`Mobile User ${user.id} joined party ${this.id}`
					);
				}

				this._mobileUser = user;
				return true;
			}
			default:
				return false;
		}
	}

	public removeUser(user: User) {
		if (user === this._desktopUser) {
			if (config.debug) {
				console.log(
					`Desktop User ${user.id} left party ${this.id}`
				);
			}

			this._desktopUser = null;
		} else if (user === this._mobileUser) {
			if (config.debug) {
				console.log(
					`Mobile User ${user.id} left party ${this.id}`
				);
			}
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
