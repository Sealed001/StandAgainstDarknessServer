import { randomUUID, UUID } from "crypto";
import { Socket } from "socket.io";

import users, { addUser, removeUser } from "@users";

import Party from "@Party";

import GameEvents, {
	desktopToMobileEventNames,
	mobileToDesktopEventNames,
} from "../events/game";

export type UserClientType = "desktop" | "mobile";

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

	private _party: Nullable<Party> = null;
	public get party(): Nullable<Party> {
		return this._party;
	}

	private _socket: Nullable<Socket> = null;

	private _isDestroyed: boolean = false;
	public get isDestroyed(): boolean {
		return this._isDestroyed;
	}

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

		this._isDestroyed = true;
	}

	public addGameEventsListener(): boolean {
		if (this.clientType === null) {
			return false;
		}

		switch (this.clientType) {
			case "desktop": {
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
			case "mobile": {
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

	private _unbindSocket() {
		if (this._socket !== null) {
			this._socket.data.user = null;
			this._socket.disconnect();
		}
	}
	public bindSocket(socket: Socket): boolean {
		if (this._socket !== null && this._socket.connected) {
			return false;
		}

		this._unbindSocket();

		this._socket = socket;

		socket.data.user = this;

		socket.on("reconnect_failed", () => {
			this.destroy();
		});

		return true;
	}

	public joinParty(party: Party): boolean {
		if (this._party !== null) {
			return false;
		}

		if (!party.addUser(this)) {
			return false;
		}

		this._party = party;
		return true;
	}
	public leaveParty() {
		if (this._party === null) {
			return;
		}

		this._party.removeUser(this);
		this._party = null;
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
