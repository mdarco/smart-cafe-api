module.exports = (io) => {
  let _sockets = [];

  const getAllConnectedSockets = () => {
    return _sockets;
  };

  const addSocket = (socket) => {
    console.log(`Added socket ${socket.id}`);
    _sockets.push(socket);
  };

  const removeSocket = (socket) => {
    console.log(`Removed socket ${socket.id}`);
    _sockets = _sockets.filter(s => s.id !== socket.id);
  };

  const socketJoin = (socket, roomId) => {
    console.log(`Socket ${socket.id} joined room ${roomId}`);
    socket.join(roomId);
  };

  const emit = (eventName, roomId, message) => {
    const socket = _sockets.find(s => {
      if (s.rooms.includes(roomId)) {
        return s;
      }
    });

    if (socket) {
      console.log(`Socket is emitting message ${message} for room ${roomId}`);
      socket.emit(eventName, message);
    }
  };

  const broadcast = (eventName, message) => {
    console.log(`Server is broadcasting message: ${message}`);
    io.emit(eventName, message);
  };

  return {
    getAllConnectedSockets,
    addSocket,
    removeSocket,
    socketJoin,
    emit,
    broadcast
  }
};
