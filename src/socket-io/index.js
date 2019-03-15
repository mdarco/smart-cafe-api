module.exports = (io, realTimeService) => {
  io.on('connection', socket => {
    console.log('New client connected: ID = ', socket.id);

    socket.on('login::success', payload => {
      console.log('Client logged in with table ID: ' + payload._id);
      realTimeService.socketJoin(socket, payload._id);
    });

    socket.on('logout', () => {
      realTimeService.socketLeaveAllRooms(socket);
      realTimeService.removeSocket(socket);
      realTimeService.disconnectSocket(socket);
      console.log(`Client ${socket.id} logged out`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected: ID = ' + socket.id);
    });
  });
};
