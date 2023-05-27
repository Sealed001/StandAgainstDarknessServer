import { UUID } from "crypto";

type AskClientIdentityErrorType =
	| "SERVER_FULL"
	| "WRONG_CLIENT_TYPE";

type AskClientIdentityResponseDataSTC =
	| {
			success: false;
			error: AskClientIdentityErrorType;
	  }
	| {
			success: true;
			id: UUID;
	  };

export default AskClientIdentityResponseDataSTC;
