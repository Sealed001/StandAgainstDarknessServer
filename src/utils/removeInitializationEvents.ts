import { Socket } from "socket.io";

export default function (socket: Socket) {
	socket.removeAllListeners("askClientIdentity");
	socket.removeAllListeners("tellClientIdentity");
}
