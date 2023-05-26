import { randomUUID, UUID } from "crypto";
import { Socket } from "socket.io";

import users from "@users";

export type UserClientType = "Desktop" | "Mobile";

export default class User {
	public static exists(id: UUID): boolean {
		return users[id] !== undefined;
	}
	public static get(id: UUID): User {
		return users[id];
	}

	private readonly _id: UUID;
	public get id(): UUID {
		return this._id;
	}

	public clientType: Nullable<UserClientType> = null;

	private _socket: Nullable<Socket> = null;
	private _expirationTimeout: Nullable<NodeJS.Timeout> = null;

	public constructor() {
		do {
			this._id = randomUUID();
		} while (User.exists(this._id));

		users[this._id] = this;
	}

	public destroy() {
		delete users[this._id];
	}

	public bindSocket(socket: Socket) {
		this._socket = socket;

		socket.data.user = this;

		socket.on("disconnect", () => {
			this._expirationTimeout = setTimeout(() => {
				this.destroy();
			});
		});

		socket.on("reconnect", () => {
			clearTimeout(this._expirationTimeout!);
			this._expirationTimeout = null;
		});
	}
}
