import { ClientToServerIdentificationEvents } from "./identification";
import { ClientToServerPartyEvents } from "./party";
import GameEvents from "./game";

export default interface ClientToServerEvents
	extends ClientToServerIdentificationEvents,
		ClientToServerPartyEvents,
		GameEvents {}
