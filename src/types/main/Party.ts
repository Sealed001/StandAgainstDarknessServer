import { randomUUID, UUID } from "crypto";

import parties from "@parties";
import User, { UserClientType } from "@User";

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

	// TODO: Implement a more secure password system in the future.
	private _password: Nullable<string> = null;
	public get hasPassword(): boolean {
		return this._password !== null;
	}

	public constructor(password: Nullable<string> = null) {
		do {
			this._id = randomUUID();
		} while (Party.exists(this._id));

		parties[this._id] = this;

		this._password = password;
	}

	public destroy() {
		delete parties[this._id];
	}

	public addUser(user: User): boolean {
		switch (user.clientType) {
			case "Desktop": {
				if (this._desktopUser !== null) {
					return false;
				}

				this._desktopUser = user;
				return true;
			}
			case "Mobile": {
				if (this._mobileUser !== null) {
					return false;
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
			this._desktopUser = null;
		} else if (user === this._mobileUser) {
			this._mobileUser = null;
		}
	}

	public isCorrectPassword(password: string): boolean {
		return this._password === password;
	}
}
