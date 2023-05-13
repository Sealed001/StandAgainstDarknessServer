import { Server } from "socket.io";

import CustomSocket from "@Socket";
import CustomServer from "@Server";

import serverOptions from "./serverOptions";
import setupInitializationEvents from "@socket/initialization/setupInitializationEvents";

const io: CustomServer = new Server(serverOptions);

io.on('connection', (socket: CustomSocket) => {
  setupInitializationEvents(socket);
  socket.removeListener('askClientIdentity')
  socket.once('init', (d) => {

  });

  for (const evName of eventsToRelay) {
    socket.on(evName, () => {

    });
  }

});

io.listen(3000);