let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(express.static(__dirname+'/public'));

// io - pega a instancia do socket.io
// io.on() - invocando, chamando a função, que tem 2 parametros (conn e function())
// socket - cara que esta conectando

let numUsers = 0;

io.on('connection', function (socket) {
    console.log('user connect.');

    socket.on('adduser', function(userName){
        let addedUser = false;
        if(addedUser){
            return;
        }
        ++numUsers;
        addedUser = true;

        socket.emit('login', {
            numUsers: numUsers
        });

        socket.userName = userName;

        socket.broadcast.emit('userJoined', {
            userName: socket.userName,
            numUsers: numUsers
        });

    });


    socket.on('disconnect', function(){
        if(addedUser)
        --numUsers;
        console.log('user disconected');

        socket.broadcast.emit('user left', {
            userName: socket.userName,
            numUsers: numUsers
        });
    });
});

http.listen(3000, function () {
    console.log('servidor - socket aula 2 de pé');
});