import TellClientIdentityEvent from "@types/events/identification/TellClientIdentityEvent";

export default interface ServerToClientEvents {
	tellClientIdentity: TellClientIdentityEvent;
}
