import CustomSocket from "@Socket";

export default function (socket: CustomSocket) {
	socket.on("leaveParty", () => {
		if (!socket.data.initialized || !socket.data.user) {
			return;
		}

		if (!socket.data.user.party) {
			return;
		}

		socket.data.user.leaveParty();
	});
}
