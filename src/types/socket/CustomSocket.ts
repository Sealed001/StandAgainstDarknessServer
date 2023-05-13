import { Socket } from "socket.io";

import SocketData from "../SocketData";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "@socket/index";

type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export default CustomSocket;
