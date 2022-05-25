class SocketInstance {
  io = require("socket.io")();
  sockets = new Set();

  constructor() {
    this.io.listen(process.env.PORT);

    this.io.on("connect", (socket) => {
      this.sockets.add(socket);

      this.handleNewSocket(socket);

      socket.on("disconnect", () => {
        this.sockets.delete(socket);
      });

      this.newSocket.next(socket);
    });
  }

  handleNewSocket(socket) {
    // logic here
  }
}

const socketInstance = new SocketInstance();

module.exports = { socketInstance };
