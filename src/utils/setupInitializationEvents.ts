import CustomSocket from "@Socket";
import User from "@User";

import { usersCount } from "@users";

import config from "@config";

export default function (socket: CustomSocket) {
	return new Promise<void>((resolve, reject) => {
		socket.once("askClientIdentity", data => {
			if (usersCount.value >= config.userMaxCount) {
				socket.emit("askClientIdentityResponse", {
					success: false,
					error: "SERVER_FULL",
				});

				reject();
				return;
			}

			if (
				data.clientType !== "Desktop" &&
				data.clientType !== "Mobile"
			) {
				socket.emit("askClientIdentityResponse", {
					success: false,
					error: "WRONG_CLIENT_TYPE",
				});

				reject();
				return;
			}

			const user = new User()
				.setClientType(data.clientType)
				.bindSocket(socket);

			socket.emit("askClientIdentityResponse", {
				success: true,
				id: user.id,
			});

			resolve();
		});
		socket.once("tellClientIdentity", data => {
			const id = data.id;

			if (typeof id !== "string") {
				socket.emit("tellClientIdentityResponse", {
					success: false,
					error: "WRONG_CLIENT_ID_FORMAT",
				});

				reject();
				return;
			}

			if (!User.exists(id)) {
				socket.emit("tellClientIdentityResponse", {
					success: false,
					error: "CLIENT_ID_NOT_FOUND",
				});

				reject();
				return;
			}

			const user = User.get(id);

			user.bindSocket(socket);

			socket.emit("tellClientIdentityResponse", {
				success: true,
			});

			resolve();
		});
	});
}
