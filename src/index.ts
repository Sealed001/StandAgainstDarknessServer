import { Server } from "socket.io";

import CustomSocket from "@Socket";
import CustomServer from "@Server";

import serverOptions from "./serverOptions";

import setupInitializationEvents from "./utils/setupInitializationEvents";
import removeInitializationEvents from "./utils/removeInitializationEvents";
import setupPartyEvents from "./utils/setupPartyEvents";
import setupPostInitializationEvents from "./utils/setupPostInitializationEvents";
import config from "@config";

const io: CustomServer = new Server(serverOptions);
const port: number = !!process.env.PORT
	? Number(process.env.PORT)
	: 3000;

io.on("connection", (socket: CustomSocket) => {
	if (config.debug) {
		console.log(`New connection: ${socket.id}`);
	}

	setupInitializationEvents(socket)
		.then(() => {
			removeInitializationEvents(socket);

			setupPostInitializationEvents(socket);
			setupPartyEvents(socket);
		})
		.catch((error: Error) => {
			console.error(error);
		});

	socket.on("disconnect", () => {
		if (config.debug) {
			console.log(`Disconnected: ${socket.id}`);
		}
	});
});

io.listen(port);

console.log(
	`${new Date().toISOString()}: Server started in ${
		process.env.NODE_ENV
	} mode on port ${port}`
);
