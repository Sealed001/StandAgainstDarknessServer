import { UUID } from "crypto";

type JoinPartyDataCTS = {
	id: UUID;
	password?: string;
};

export default JoinPartyDataCTS;
