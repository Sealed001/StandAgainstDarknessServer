import { UUID } from "crypto";

import Socket from "@Socket";
import User from "@User";

export default function (socket: Socket) {
	return new Promise<void>((resolve, reject) => {
		socket.once("askClientIdentity", () => {
			const user = new User();
			user.bindSocket(socket);

			socket.emit("tellClientIdentity", user.id);
			resolve();
		});
		socket.once("tellClientIdentity", (id: UUID) => {
			if (User.exists(id)) {
				const user = User.get(id);
				user.bindSocket(socket);

				resolve();
			} else {
				reject();
			}
		});
	});
}
