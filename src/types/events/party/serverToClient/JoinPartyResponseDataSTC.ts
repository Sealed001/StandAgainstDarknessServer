export type JoinPartyErrorType =
	| "PARTY_NOT_FOUND"
	| "INCORRECT_PASSWORD";

type JoinPartyResponseDataSTC =
	| {
			success: true;
	  }
	| {
			success: false;
			error: JoinPartyErrorType;
	  };

export default JoinPartyResponseDataSTC;
