module.exports = (io) => {
  let _sockets = [];

  const getAllConnectedSockets = () => {
    return _sockets;
  };

  const addSocket = (socket) => {
    _sockets.push(socket);
  };

  const removeSocket = (socket) => {
    _sockets = _sockets.filter(s => s.id !== socket.id);
  };

  const socketJoin = (socket, roomId) => {
    socket.join(roomId);
  };

  const emit = (roomId, message) => {
    const socket = _sockets.find(s => {
      if (s.rooms.includes(roomId)) {
        return s;
      }
    });

    if (socket) {
      socket.emit(message);
    }
  };

  const broadcast = (message) => {
    io.emit(message);
  };

  return {
    getAllConnectedSockets,
    addSocket,
    removeSocket,
    emit,
    broadcast
  }
};
