import { Server } from "socket.io";

import CustomSocket from "@Socket";
import CustomServer from "@Server";

import serverOptions from "./serverOptions";

import setupInitializationEvents from "./utils/setupInitializationEvents";
import removeInitializationEvents from "./utils/removeInitializationEvents";

const io: CustomServer = new Server(serverOptions);
const port: number = !!process.env.PORT ? Number(process.env.PORT) : 3000;

io.on("connection", (socket: CustomSocket) => {
	setupInitializationEvents(socket)
		.then(() => {
			removeInitializationEvents(socket);
		})
		.catch(() => {})
		.finally(() => {});
});

io.listen(port);
