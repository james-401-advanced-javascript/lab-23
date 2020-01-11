const server = require("socket.io")();

server.on("connection", client => {
  client.on("message", socket => {
    server.emit("broadcast", {
      name: socket.name,
      message: socket.message
    });
  });
});

server.listen(3000);
console.log("Server listening on Port 3000");
