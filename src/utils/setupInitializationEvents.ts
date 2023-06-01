import CustomSocket from "@Socket";
import User from "@User";

import { usersCount } from "@users";

import config from "@config";

export default function (socket: CustomSocket) {
	return new Promise<void>((resolve, reject) => {
		socket.on("askClientIdentity", data => {
			if (socket.data.initialized === true) {
				return;
			}

			if (usersCount.value >= config.userMaxCount) {
				socket.emit("askClientIdentityResponse", {
					success: false,
					error: "SERVER_FULL",
				});

				reject();
				return;
			}

			if (
				data.clientType !== "desktop" &&
				data.clientType !== "mobile"
			) {
				socket.emit("askClientIdentityResponse", {
					success: false,
					error: "WRONG_CLIENT_TYPE",
				});

				reject();
				return;
			}

			const user = new User();
			user.clientType = data.clientType;
			user.bindSocket(socket);

			if (config.debug) {
				console.log(
					`User ${user.id} connected with client type ${user.clientType}`
				);
			}

			socket.data.initialized = true;

			socket.emit("askClientIdentityResponse", {
				success: true,
				id: user.id,
			});

			resolve();
		});
		socket.on("tellClientIdentity", data => {
			if (socket.data.initialized === true) {
				return;
			}

			const id = data.id;

			if (typeof id !== "string") {
				socket.emit("tellClientIdentityResponse", {
					success: false,
					error: "CLIENT_ID_NOT_FOUND",
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

			if (!user.bindSocket(socket)) {
				socket.emit("tellClientIdentityResponse", {
					success: false,
					error:
						"CLIENT_ID_ALREADY_BIND_TO_A_CONNECTED_SOCKET",
				});

				reject();
				return;
			}

			socket.data.initialized = true;

			socket.emit("tellClientIdentityResponse", {
				success: true,
			});

			resolve();
		});
	});
}
