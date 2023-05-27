import { ServerToClientIdentificationEvents } from "./identification";
import { ServerToClientPartyEvents } from "./party";
import GameEvents from "./game";

export default interface ServerToClientEvents
	extends ServerToClientIdentificationEvents,
		ServerToClientPartyEvents,
		GameEvents {}
