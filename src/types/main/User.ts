import { randomUUID, UUID } from "crypto";

import users, { addUser, removeUser } from "@users";
import config from "@config";

import Party from "@Party";
import CustomSocket from "@Socket";

import GameEvents, {
	desktopToMobileEventNames,
	mobileToDesktopEventNames,
} from "../events/game";

import setupPartyEvents from "../../utils/setupPartyEvents";
import removePartyEvents from "../../utils/removePartyEvents";

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

	private _socket: Nullable<CustomSocket> = null;

	private _isDestroyed: boolean = false;
	public get isDestroyed(): boolean {
		return this._isDestroyed;
	}

	public constructor() {
		do {
			this._id = randomUUID();
		} while (User.exists(this._id));

		if (config.debug) {
			console.log(`Created user ${this._id}`);
		}

		addUser(this);
	}

	public destroy() {
		this.party?.removeUser(this);

		this._unbindSocket();

		removeUser(this);

		if (config.debug) {
			console.log(`Destroyed user ${this._id}`);
		}

		this._isDestroyed = true;
	}

	public setupGameEventsListeners(): boolean {
		if (this.clientType === null) {
			return false;
		}

		switch (this.clientType) {
			case "desktop": {
				for (const eventName of desktopToMobileEventNames) {
					// @ts-ignore
					this._socket?.on(eventName, data => {
						if (this.party === null) {
							return;
						}

						if (this.party.mobileUser === null) {
							return;
						}

						if (config.debug) {
							console.log(
								`Relaying ${eventName} to mobile user ${this.party.mobileUser.id}`
							);
							console.log(typeof data);
							if (typeof data === "object") {
								console.log(data);
							}
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
					// @ts-ignore
					this._socket?.on(eventName, data => {
						if (this.party === null) {
							return;
						}

						if (this.party.desktopUser === null) {
							return;
						}

						if (config.debug) {
							console.log(
								`Relaying ${eventName} to desktop user ${this.party.desktopUser.id}`
							);
							console.log(typeof data);
							if (typeof data === "object") {
								console.log(data);
							}
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

	public removeGameEventsListeners() {
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
			if (config.debug) {
				console.log(
					`User ${this._id} unbound from socket ${this._socket.id}`
				);
			}

			this._socket.data.user = undefined;
			this._socket.disconnect();
		}
	}
	public bindSocket(socket: CustomSocket): boolean {
		if (this._socket !== null && this._socket.connected) {
			return false;
		}

		this._unbindSocket();

		this._socket = socket;

		socket.data.user = this;

		if (config.debug) {
			console.log(
				`User ${this._id} bound to socket ${socket.id}`
			);
		}

		// @ts-ignore
		socket.on("disconnect", () => {
			this.destroy();
		});

		return true;
	}

	public joinParty(party: Party): boolean {
		if (this._socket === null) {
			return false;
		}

		if (this._party !== null) {
			return false;
		}

		if (!party.addUser(this)) {
			return false;
		}

		this._party = party;
		this.setupGameEventsListeners();
		removePartyEvents(this._socket);

		return true;
	}
	public leaveParty() {
		if (this._party === null) {
			return;
		}

		this._party.removeUser(this);
		this._party = null;

		if (this._socket === null) {
			return;
		}

		this.removeGameEventsListeners();
		setupPartyEvents(this._socket);
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
