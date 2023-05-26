import { UUID } from "crypto";

type TellClientIdentityEvent = (id: UUID) => void;
export default TellClientIdentityEvent;
