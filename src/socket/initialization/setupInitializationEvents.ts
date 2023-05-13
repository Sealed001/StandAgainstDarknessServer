import { UUID } from "crypto";

import Socket from "@Socket";
import User from "@User";
import removeInitializationEvents from "@socket/initialization/removeInitializationEvents";

export default function (socket: Socket) {
  socket.once('askClientIdentity', () => {
    const user = new User();

    socket.data.user = user;
    socket.emit('tellClientIdentity', user.id);

    removeInitializationEvents(socket);
  });
  socket.once('tellClientIdentity', (id: UUID) => {
    User.exists(id)
  });
};