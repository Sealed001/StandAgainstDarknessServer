import CustomSocket from "@Socket";

export default function (socket: CustomSocket) {
	socket.on("leaveParty", () => {
		if (!socket.data.initialized || !socket.data.user) {
			return;
		}

		if (!socket.data.user.party) {
			socket.emit("leavePartyResponse", {
				success: false,
			});
			return;
		}

		const leavePartySuccess = socket.data.user.leaveParty();

		socket.emit("leavePartyResponse", {
			success: leavePartySuccess,
		});
	});
}
