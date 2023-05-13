import AskClientIdentityEvent from "@socket/initialization/AskClientIdentityEvent";
import TellClientIdentityEvent from "@socket/initialization/TellClientIdentityEvent";

export default interface ClientToServerEvents {
  askClientIdentity: AskClientIdentityEvent;
  tellClientIdentity: TellClientIdentityEvent;
};