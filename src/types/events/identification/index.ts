import AskClientIdentityDataCTS from "./clientToServer/AskClientIdentityDataCTS";
import TellClientIdentityDataCTS from "./clientToServer/TellClientIdentityDataCTS";
import AskClientIdentityResponseDataSTC from "./serverToClient/AskClientIdentityResponseDataSTC";
import TellClientIdentityResponseDataSTC from "./serverToClient/TellClientIdentityResponseDataSTC";

import EventCallback from "../EventCallback";

interface ClientToServerIdentificationEvents {
	askClientIdentity: EventCallback<AskClientIdentityDataCTS>;
	tellClientIdentity: EventCallback<TellClientIdentityDataCTS>;
}

interface ServerToClientIdentificationEvents {
	askClientIdentityResponse: EventCallback<AskClientIdentityResponseDataSTC>;
	tellClientIdentityResponse: EventCallback<TellClientIdentityResponseDataSTC>;
}

export {
	ClientToServerIdentificationEvents,
	ServerToClientIdentificationEvents,
};
