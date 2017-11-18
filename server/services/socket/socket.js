const { SocketEvents: Events } = require("./../../../src/common/constants");
const socketIO = require('socket.io');

class UziSocket {
  constructor(server) {
    this.io = socketIO(server);
    this.io.on("connection", socket => {
      console.log(`Connected`);
      this.socket = socket;
    });
  }
  emitChange(status) {
    this.socket.emit(Events.STATUS_CHANGE, { status });
  }
}

module.exports = UziSocket;
