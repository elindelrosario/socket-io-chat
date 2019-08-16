const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 3000;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    socket.on("chat message", function(msg) {
        io.emit("chat message", msg);
    });
})

http.listen(process.env.PORT || PORT, function() {
    console.log(`listening on PORT ${PORT}`)
});