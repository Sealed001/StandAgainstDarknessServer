import { UUID } from "crypto";

type JoinPartyData = {
	partyId: UUID;
	password?: string;
};

export default JoinPartyData;
