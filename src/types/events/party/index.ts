import GetPartiesDataCTS from "./clientToServer/GetPartiesDataCTS";
import JoinPartyDataCTS from "./clientToServer/JoinPartyDataCTS";
import CreatePartyDataCTS from "./clientToServer/CreatePartyDataCTS";

import GetPartiesResponseDataSTC from "./serverToClient/GetPartiesResponseDataSTC";
import JoinPartyResponseDataSTC from "./serverToClient/JoinPartyResponseDataSTC";
import createPartyResponseDataSTC from "./serverToClient/CreatePartyResponseDataSTC";

import EventCallback from "../EventCallback";

interface ClientToServerPartyEvents {
	getParties: EventCallback<GetPartiesDataCTS>;
	joinParty: EventCallback<JoinPartyDataCTS>;
	createParty: EventCallback<CreatePartyDataCTS>;
}

interface ServerToClientPartyEvents {
	getPartiesResponse: EventCallback<GetPartiesResponseDataSTC>;
	joinPartyResponse: EventCallback<JoinPartyResponseDataSTC>;
	createPartyResponse: EventCallback<createPartyResponseDataSTC>;
}

export {
	ClientToServerPartyEvents,
	ServerToClientPartyEvents,
};
