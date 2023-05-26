import { UUID } from "crypto";

type JoinPartyData = {
    partyId: UUID;
    password?: string;
};

type JoinPartyEvent = (data: JoinPartyData) => void;

export default JoinPartyEvent;
export { JoinPartyData };