const io = require('../../server.js').io;
// console.log(io);
var Socket = {
    emit: function (event, data) {
        io.sockets.emit(event, data);
    }
};

console.log("server")
io.on("connection", function (socket) {
    console.log("A user connected");
   
    // Socket.emit("game win");

    socket.on('save_message', async function () {
        console.log("nice");
    });

    socket.on('disconnect', () => {
        // clearInterval(interval);
        console.log('user disconnected');
    });

});

exports.Socket = Socket;