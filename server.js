const server = require("socket.io")();

server.on("connection", client => {
  client.on("message", socket => {
    server.emit("broadcast", {
      name: socket.name,
      message: socket.message
    });
  });
});

let PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log("Server listening on Port " + PORT);
