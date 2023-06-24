import { UUID } from "crypto";

import PartyInfo from "@PartyInfo";
import CustomSocket from "@Socket";

import parties from "@parties";
import config from "@config";

import Party from "@Party";

import { CreatePartyErrorType } from "../types/events/party/serverToClient/CreatePartyResponseDataSTC";

import log from "./log";

export default function (socket: CustomSocket) {
	socket.on("getParties", () => {
		if (socket.data.initialized && socket.data.user) {
			log(
				`User with id ${socket.data.user.id} requested parties`
			);
		}

		const partiesInfos: PartyInfo[] = [];

		for (const partyId in parties) {
			const party = parties[partyId as UUID];

			partiesInfos.push({
				id: party.id,
				name: party.name,
				connectedClientTypes:
					party.connectedUsersAsClientTypes,
				hasPassword: party.hasPassword,
			});
		}

		socket.emit("getPartiesResponse", {
			parties: partiesInfos,
		});
	});

	socket.on("createParty", data => {
		if (!socket.data.initialized || !socket.data.user) {
			return;
		}

		const partyName = data.name;
		const partyPassword: Nullable<string> =
			typeof data.password === "string"
				? data.password
				: null;

		const errors: CreatePartyErrorType[] = [];

		if (
			typeof partyName !== "string" ||
			partyName.length < config.partyNameSizeRange[0]
		) {
			errors.push("NAME_TOO_SHORT");
		} else if (
			typeof partyName === "string" &&
			partyName.length > config.partyNameSizeRange[1]
		) {
			errors.push("NAME_TOO_LONG");
		}

		if (
			typeof partyPassword === "string" &&
			partyPassword.length <
				config.partyPasswordSizeRange[0]
		) {
			errors.push("PASSWORD_TOO_SHORT");
		} else if (
			typeof partyPassword === "string" &&
			partyPassword.length >
				config.partyPasswordSizeRange[1]
		) {
			errors.push("PASSWORD_TOO_LONG");
		}

		if (errors.length > 0) {
			socket.emit("createPartyResponse", {
				success: false,
				errors,
			});
			return;
		}

		const party = new Party(partyName, partyPassword);
		const joinPartyResult =
			socket.data.user.joinParty(party);

		if (!joinPartyResult) {
			party.destroy();

			socket.emit("createPartyResponse", {
				success: false,
				errors: ["CAN_NOT_CREATE_PARTY"],
			});
			return;
		}

		socket.emit("createPartyResponse", {
			success: true,
			partyId: party.id,
		});
	});

	socket.on("joinParty", data => {
		if (!socket.data.initialized || !socket.data.user) {
			return;
		}

		const partyId = data.id;
		const partyPassword: Nullable<string> =
			data.password ?? null;

		if (typeof partyId !== "string") {
			socket.emit("joinPartyResponse", {
				success: false,
				error: "PARTY_NOT_FOUND",
			});
			return;
		}

		if (!Party.exists(partyId)) {
			socket.emit("joinPartyResponse", {
				success: false,
				error: "PARTY_NOT_FOUND",
			});
			return;
		}

		const party = Party.get(partyId);

		if (party.hasPassword && partyPassword === null) {
			socket.emit("joinPartyResponse", {
				success: false,
				error: "INCORRECT_PASSWORD",
			});
			return;
		}

		if (
			party.hasPassword &&
			partyPassword !== null &&
			!party.isCorrectPassword(partyPassword)
		) {
			socket.emit("joinPartyResponse", {
				success: false,
				error: "INCORRECT_PASSWORD",
			});
			return;
		}

		const joinPartyResult =
			socket.data.user.joinParty(party);

		if (!joinPartyResult) {
			socket.emit("joinPartyResponse", {
				success: false,
				error: "CAN_NOT_JOIN_PARTY",
			});
			return;
		}

		socket.emit("joinPartyResponse", {
			success: true,
		});
	});
}
