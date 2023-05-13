import TellClientIdentityEvent from "@socket/initialization/TellClientIdentityEvent";

export default interface ServerToClientEvents {
  tellClientIdentity: TellClientIdentityEvent
};