const server = require("socket.io")();

const socketPool = {};

server.on("connection", client => {  
  
  client.on('username', socket => {
    socketPool[client.id] = socket.name;
    // Send this information back to client, to render userlist
    server.emit('broadcast', {
      user: socket.name,
      userGroup: socketPool
    })
  });

  client.on('disconnect', () => {
    if (socketPool[client.id]) {
      let socketName = socketPool[client.id];
      delete socketPool[client.id];
    server.emit('broadcast', {
      exitMessage: `${socketName} has left the chat.`,
      userGroup: socketPool
    })
  }
  });


    client.on("message", socket => {
    server.emit("broadcast", {
      name: socket.name,
      message: socket.message,
      pic: socket.pic
    });
  });

});

let PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log("Server listening on Port " + PORT);
