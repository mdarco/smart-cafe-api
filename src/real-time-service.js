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
    _sockets = _sockets.filter(s => s.id !== socket.id);
    console.log(`Removed socket ${socket.id}`);
  };

  const disconnectSocket = (socket) => {
    socket.disconnect();
    console.log(`Socket ${socket.id} disconnected`);
  };

  const socketJoin = (socket, roomId) => {
    console.log(`Socket ${socket.id} joined room ${roomId}`);
    socket.join(roomId);
  };

  const socketLeaveAllRooms = (socket) => {
    const rooms = Object.keys(socket.rooms).filter(room => room !== socket.id);
    console.log('ROOMS TO LEAVE', rooms);
    rooms.forEach(room => {
      socket.leave(room);
    });
    console.log(`Socket ${socket.id} left all rooms`);
  };

  const emit = (eventName, roomId, message) => {
    const socket = _sockets.find(s => {
      if (s.rooms.includes(roomId)) {
        return s;
      }
    });

    if (socket) {
      console.log(`Socket is emitting event [${eventName}] with message "${message}" for room ${roomId}`);
      socket.emit(eventName, message);
    }
  };

  const broadcast = (eventName, message) => {
    console.log(`Server is broadcasting event [${eventName}] with message "${message}"`);
    io.emit(eventName, message);
  };

  return {
    getAllConnectedSockets,
    addSocket,
    removeSocket,
    disconnectSocket,
    socketJoin,
    socketLeaveAllRooms,
    emit,
    broadcast
  }
};
