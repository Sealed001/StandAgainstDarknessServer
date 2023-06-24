import { UUID } from "crypto";
import { UserClientType } from "@User";

type PartyInfo = {
	id: UUID;
	name: string;
	connectedClientTypes: UserClientType[];
	hasPassword: boolean;
};

export default PartyInfo;
