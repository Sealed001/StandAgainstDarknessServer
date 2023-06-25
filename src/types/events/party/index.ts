import GetPartiesDataCTS from "./clientToServer/GetPartiesDataCTS";
import JoinPartyDataCTS from "./clientToServer/JoinPartyDataCTS";
import CreatePartyDataCTS from "./clientToServer/CreatePartyDataCTS";
import LeavePartyDataCTS from "./clientToServer/LeavePartyDataCTS";

import GetPartiesResponseDataSTC from "./serverToClient/GetPartiesResponseDataSTC";
import JoinPartyResponseDataSTC from "./serverToClient/JoinPartyResponseDataSTC";
import createPartyResponseDataSTC from "./serverToClient/CreatePartyResponseDataSTC";
import PeerDisconnectDataSTC from "./serverToClient/PeerDisconnectDataSTC";
import PartyPlayersCountUpdatedDataSTC from "./serverToClient/PartyPlayersCountUpdatedDataSTC";
import StartGameResponseDataSTC from "./serverToClient/StartGameResponseDataSTC";

import EventCallback from "../EventCallback";
import LeavePartyResponseDataSTC from "./serverToClient/LeavePartyResponseDataSTC";

interface ClientToServerPartyEvents {
	getParties: EventCallback<GetPartiesDataCTS>;
	joinParty: EventCallback<JoinPartyDataCTS>;
	createParty: EventCallback<CreatePartyDataCTS>;
	leaveParty: EventCallback<LeavePartyDataCTS>;
}

interface ServerToClientPartyEvents {
	getPartiesResponse: EventCallback<GetPartiesResponseDataSTC>;
	joinPartyResponse: EventCallback<JoinPartyResponseDataSTC>;
	createPartyResponse: EventCallback<createPartyResponseDataSTC>;
	peerDisconnect: EventCallback<PeerDisconnectDataSTC>;
	partyPlayersCountUpdated: EventCallback<PartyPlayersCountUpdatedDataSTC>;
	startGameResponse: EventCallback<StartGameResponseDataSTC>;
	leavePartyResponse: EventCallback<LeavePartyResponseDataSTC>;
}

export {
	ClientToServerPartyEvents,
	ServerToClientPartyEvents,
};
