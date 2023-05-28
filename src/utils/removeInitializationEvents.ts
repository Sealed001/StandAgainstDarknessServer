import CustomSocket from "@Socket";

export default function (socket: CustomSocket) {
	socket.removeAllListeners("askClientIdentity");
	socket.removeAllListeners("tellClientIdentity");
}
