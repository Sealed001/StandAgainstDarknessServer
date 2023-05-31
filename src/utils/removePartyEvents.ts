import CustomSocket from "@Socket";

export default function (socket: CustomSocket) {
	socket.removeAllListeners("getParties");
	socket.removeAllListeners("createParty");
	socket.removeAllListeners("joinParty");
}
