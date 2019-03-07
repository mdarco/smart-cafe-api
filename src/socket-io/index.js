module.exports = (io) => {
  io.on('connection', socket => {
      console.log('Client connected..');

      socket.on('category:opened', message => {
        console.log('Client clicked on category ' + message);
      });
  });
};
