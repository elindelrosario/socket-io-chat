const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");

const PORT = 3000;

var totalUsers = 0;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    totalUsers++;

    socket.on("chat message", function(data) {
        if (data.username == null) {
            data.username = `Guest ${totalUsers}`;
        }
        io.emit("chat message", data);
    });
});

server.listen(process.env.PORT || PORT, function() {
    console.log(`listening on PORT ${PORT}`)
});
