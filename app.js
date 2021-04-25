const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const socketio = require('socket.io')({
    allowEIO3: true
})

server.listen(3000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let io = socketio.listen(server);

io.on('connection', function (socket) {
    let date = new Date()
    console.log(`Connection : Socket with id ${socket.id} is connected at ${date.getHours()}:${date.getMinutes()}`)

    socket.on('disconnect', function (reason) {
        let currentDate = new Date()
        console.log(`Disconnection: Socket with id ${socket.id} is disconnected, reason: ${reason} at ${currentDate.getHours()}:${currentDate.getMinutes()}`)
    });

    socket.on('ping', function () {
        socket.emit('pong')
    })

    socket.on('broadcast', function () {
        socket.broadcast.emit("broadcast")
    })
});

