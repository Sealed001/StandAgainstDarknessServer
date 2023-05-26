import AskClientIdentityEvent from "@types/events/identification/AskClientIdentityEvent";
import TellClientIdentityEvent from "@types/events/identification/TellClientIdentityEvent";

export default interface ClientToServerEvents {
	askClientIdentity: AskClientIdentityEvent;
	tellClientIdentity: TellClientIdentityEvent;
}
