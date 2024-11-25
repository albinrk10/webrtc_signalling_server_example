// Configura el puerto para el servidor. Usa el puerto definido en la variable de entorno `PORT` o el 3000 por defecto.
let port = process.env.PORT || 3000;

// Importa y configura Socket.IO para el puerto especificado, habilitando CORS (Cross-Origin Resource Sharing).
let IO = require("socket.io")(port, {
  cors: {
    origin: "*", // Permite solicitudes desde cualquier origen.
    methods: ["GET", "POST"], // Métodos HTTP permitidos.
  },
});

// Middleware para autenticar el `callerId` en la conexión inicial.
IO.use((socket, next) => {
  if (socket.handshake.query) {
    let callerId = socket.handshake.query.callerId; // Obtiene el `callerId` del query string.
    socket.user = callerId; // Asigna el `callerId` al objeto `socket`.
    next(); // Continúa con la conexión.
  }
});

// Evento principal cuando un cliente se conecta.
IO.on("connection", (socket) => {
  console.log(socket.user, "Connected"); // Muestra en la consola quién se conectó.

  // Une al cliente a una sala única identificada por su `callerId`.
  socket.join(socket.user);

  // Evento: `makeCall` para iniciar una llamada.
  socket.on("makeCall", (data) => {
    let calleeId = data.calleeId; // Obtiene el ID del receptor.
    let sdpOffer = data.sdpOffer; // Obtiene la oferta SDP de la llamada.

    // Envía un evento `newCall` al receptor con el `callerId` y la oferta SDP.
    socket.to(calleeId).emit("newCall", {
      callerId: socket.user, // ID del llamador.
      sdpOffer: sdpOffer, // Oferta SDP para iniciar la conexión.
    });
  });

  // Evento: `answerCall` para responder a una llamada.
  socket.on("answerCall", (data) => {
    let callerId = data.callerId; // Obtiene el ID del llamador.
    let sdpAnswer = data.sdpAnswer; // Obtiene la respuesta SDP de la llamada.

    // Envía un evento `callAnswered` al llamador con la respuesta SDP.
    socket.to(callerId).emit("callAnswered", {
      callee: socket.user, // ID del receptor que responde.
      sdpAnswer: sdpAnswer, // Respuesta SDP para completar la conexión.
    });
  });

  // Evento: `IceCandidate` para manejar candidatos ICE durante la llamada.
  socket.on("IceCandidate", (data) => {
    let calleeId = data.calleeId; // Obtiene el ID del receptor.
    let iceCandidate = data.iceCandidate; // Obtiene el candidato ICE.

    // Envía un evento `IceCandidate` al receptor con el candidato ICE.
    socket.to(calleeId).emit("IceCandidate", {
      sender: socket.user, // ID del usuario que envió el candidato ICE.
      iceCandidate: iceCandidate, // Detalles del candidato ICE.
    });
  });
});
