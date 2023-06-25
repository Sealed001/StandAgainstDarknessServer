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

	private _locked: boolean = false;
	public get locked(): boolean {
		return this._locked;
	}
	public set locked(value: boolean) {
		this._locked = value;

		if (this._locked) {
			log(`Party with id ${this._id} is now locked.`);
		} else {
			log(`Party with id ${this._id} is now unlocked.`);
		}
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
		this._desktopUser?.leaveParty(true);
		this._mobileUser?.leaveParty(true);

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

				if (this._mobileUser !== null) {
					this._mobileUser.emitPartyPlayersCountUpdate(2);
				}

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

				if (this._desktopUser !== null) {
					this._desktopUser.emitPartyPlayersCountUpdate(2);
				}

				return true;
			}
			default:
				return false;
		}
	}

	public removeUser(user: User, force = false): boolean {
		if (this.locked && !force) {
			return false;
		}

		if (user === this._desktopUser) {
			log(
				`Desktop User with id ${user.id} left party with id ${this.id}`
			);

			this._desktopUser = null;

			if (this._mobileUser !== null) {
				this._mobileUser.emitPartyPlayersCountUpdate(1);
			}
		}

		if (user === this._mobileUser) {
			log(
				`Mobile User with id ${user.id} left party with id ${this.id}`
			);

			this._mobileUser = null;

			if (this._desktopUser !== null) {
				this._desktopUser.emitPartyPlayersCountUpdate(1);
			}
		}

		if (
			this._destroyOnNoConnectedUsers &&
			this.connectedUsers.length === 0
		) {
			this.destroy();
		}

		return true;
	}

	public isCorrectPassword(password: string): boolean {
		return this._password === password;
	}
}
