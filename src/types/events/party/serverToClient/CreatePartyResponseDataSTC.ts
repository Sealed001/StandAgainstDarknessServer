import { UUID } from "crypto";

export type CreatePartyErrorType =
	| "PASSWORD_TOO_SHORT"
	| "PASSWORD_TOO_LONG"
	| "NAME_TOO_SHORT"
	| "NAME_TOO_LONG"
	| "FORBIDDEN_NAME"
	| "CAN_NOT_CREATE_PARTY";

type CreatePartyResponseDataSTC =
	| {
			success: true;
			partyId: UUID;
	  }
	| {
			success: false;
			errors: CreatePartyErrorType[];
	  };

export default CreatePartyResponseDataSTC;
