import CustomSocket from "@Socket";

export default function (socket: CustomSocket) {
	socket.on("leaveParty", () => {
		if (!socket.data.initialized || !socket.data.user) {
			return;
		}

		socket.data.user.leaveParty();
	});
}
