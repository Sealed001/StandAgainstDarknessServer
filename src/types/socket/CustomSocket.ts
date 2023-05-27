import { Socket } from "socket.io";

import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "@events";
import SocketData from "../SocketData";

type CustomSocket = Socket<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
>;
export default CustomSocket;
