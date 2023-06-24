export type JoinPartyErrorType =
	| "PARTY_NOT_FOUND"
	| "INCORRECT_PASSWORD"
	| "CAN_NOT_JOIN_PARTY";

type JoinPartyResponseDataSTC =
	| {
			success: true;
	  }
	| {
			success: false;
			error: JoinPartyErrorType;
	  };

export default JoinPartyResponseDataSTC;
