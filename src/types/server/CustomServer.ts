import { Server } from "socket.io";

import SocketData from "../SocketData";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "@socket/index";

type CustomServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export default CustomServer;