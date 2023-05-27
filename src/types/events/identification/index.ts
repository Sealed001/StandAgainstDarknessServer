import AskClientIdentityDataCTS from "./clientToServer/AskClientIdentityDataCTS";
import TellClientIdentityDataED from "./eitherDirections/TellClientIdentityDataED";
import TellClientIdentityResponseDataSTC from "./serverToClient/TellClientIdentityResponseDataSTC";

import EventCallback from "../EventCallback";

interface ClientToServerIdentificationEvents {
	askClientIdentity: EventCallback<AskClientIdentityDataCTS>;
	tellClientIdentity: EventCallback<TellClientIdentityDataED>;
}

interface ServerToClientIdentificationEvents {
	tellClientIdentity: EventCallback<TellClientIdentityDataED>;
	tellClientIdentityResponse: EventCallback<TellClientIdentityResponseDataSTC>;
}

export { ClientToServerIdentificationEvents, ServerToClientIdentificationEvents };
