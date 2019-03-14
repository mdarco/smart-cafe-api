module.exports = (io, realTimeService) => {
  io.on('connection', socket => {
    console.log('New client connected: ID = ', socket.id);

    socket.on('login:success', payload => {
      console.log('Client logged in with table ID: ' + payload.tableId);
      realTimeService.socketJoin(socket, payload.tableId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected: ID = ' + socket.id);
    });
  });
};
