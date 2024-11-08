// server.js (Servidor en Node.js)
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado:", socket.id);

  socket.on("mensaje", (data) => {
    io.emit("mensaje_recibido", data);
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
  });
});

server.listen(3001, () => {
  console.log("Servidor de Socket.IO escuchando en el puerto 3001");
});
