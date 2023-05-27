import { randomUUID, UUID } from "crypto";
import { Socket } from "socket.io";

import users, { addUser, removeUser } from "@users";

import Party from "@Party";

import GameEvents, {
	desktopToMobileEventNames,
	mobileToDesktopEventNames,
} from "../events/game";

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

	private _clientType: Nullable<UserClientType> = null;
	public get clientType(): Nullable<UserClientType> {
		return this._clientType;
	}

	public party: Nullable<Party> = null;

	private _socket: Nullable<Socket> = null;

	public constructor() {
		do {
			this._id = randomUUID();
		} while (User.exists(this._id));

		addUser(this);
	}

	public destroy() {
		this.party?.removeUser(this);

		this._unbindSocket();

		removeUser(this);
	}

	private _unbindSocket() {
		if (this._socket !== null) {
			this._socket.data.user = null;
			this._socket.disconnect();
		}
	}

	public setClientType(clientType: UserClientType): User {
		this._clientType = clientType;
		return this;
	}

	public addGameEventsListener(): boolean {
		if (this.clientType === null) {
			return false;
		}

		switch (this.clientType) {
			case "Desktop": {
				for (const eventName of desktopToMobileEventNames) {
					this._socket?.on(eventName, data => {
						if (this.party === null) {
							return;
						}

						if (this.party.mobileUser === null) {
							return;
						}

						this.party.mobileUser.emitGameEvent(
							eventName,
							data
						);
					});
				}
				break;
			}
			case "Mobile": {
				for (const eventName of mobileToDesktopEventNames) {
					this._socket?.on(eventName, data => {
						if (this.party === null) {
							return;
						}

						if (this.party.desktopUser === null) {
							return;
						}

						this.party.desktopUser.emitGameEvent(
							eventName,
							data
						);
					});
				}
				break;
			}
		}

		return true;
	}

	public removeGameEventsListener() {
		if (this._socket === null) {
			return;
		}

		for (const eventName of [
			...desktopToMobileEventNames,
			...mobileToDesktopEventNames,
		]) {
			this._socket.removeAllListeners(eventName);
		}
	}

	public bindSocket(socket: Socket): User {
		this._unbindSocket();

		this._socket = socket;

		socket.data.user = this;

		socket.on("reconnect_failed", () => {
			this.destroy();
		});

		return this;
	}

	public emitGameEvent(
		eventName: keyof GameEvents,
		data: any
	) {
		if (this._socket === null) {
			return;
		}

		this._socket.emit(eventName, data);
	}
}
