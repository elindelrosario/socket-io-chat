const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");

const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("chat message", function(msg) {
        io.emit("chat message", msg);
    });
});

server.listen(process.env.PORT || PORT, function() {
    console.log(`listening on PORT ${PORT}`)
});
