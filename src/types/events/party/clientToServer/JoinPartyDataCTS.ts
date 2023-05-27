import { UUID } from "crypto";

type JoinPartyDataCTS = {
	partyId: UUID;
	password?: string;
};

export default JoinPartyDataCTS;
