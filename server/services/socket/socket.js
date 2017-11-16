const { SocketEvents: Events } = require("./../../../src/common/constants");

class UziSocket {
  constructor(io) {
    this.io = io;
    this.io.on("connection", socket => {
      console.log(`Connected`);
      this.socket = socket;
    });
  }
  attach(server) {
    this.io.attach(server);
  }
  emitChange(status) {
    this.socket.emit(Events.STATUS_CHANGE, { status });
  }
}

module.exports = UziSocket;
