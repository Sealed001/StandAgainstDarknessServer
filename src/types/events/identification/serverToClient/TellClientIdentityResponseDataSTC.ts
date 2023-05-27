export type TellClientIdentityErrorType =
	| "CLIENT_ID_NOT_FOUND"
	| "CLIENT_ID_ALREADY_BIND_TO_ANOTHER_SOCKET";

export type TellClientIdentityResponseDataSTC =
	| {
			success: false;
			error: TellClientIdentityErrorType;
	  }
	| {
			success: true;
	  };

export default TellClientIdentityResponseDataSTC;
