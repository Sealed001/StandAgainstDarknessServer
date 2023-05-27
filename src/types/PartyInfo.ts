import { UUID } from "crypto";
import { UserClientType } from "@User";

type PartyInfo = {
	id: UUID;
	connectedClientTypes: UserClientType[];
	hasPassword: boolean;
};

export default PartyInfo;
