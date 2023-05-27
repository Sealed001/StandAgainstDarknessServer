import GetPartiesDataCTS from "./clientToServer/GetPartiesDataCTS";
import JoinPartyDataCTS from "./clientToServer/JoinPartyDataCTS";
import GetPartiesResultDataSTC from "./serverToClient/GetPartiesResultDataSTC";
import JoinPartyResultDataSTC from "./serverToClient/JoinPartyResultDataSTC";

import EventCallback from "../EventCallback";

interface ClientToServerPartyEvents {
	getParties: EventCallback<GetPartiesDataCTS>;
	joinParty: EventCallback<JoinPartyDataCTS>;
}

interface ServerToClientPartyEvents {
	getPartiesResult: EventCallback<GetPartiesResultDataSTC>;
	joinPartyResult: EventCallback<JoinPartyResultDataSTC>;
}

export { ClientToServerPartyEvents, ServerToClientPartyEvents };
