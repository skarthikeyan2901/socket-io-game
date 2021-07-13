// const { Server } = require('socket.io');
console.log('Connected');

const PORT = 3001;

const io = require('socket.io')(PORT, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    },
})

let players = [];
let responses = [];
let one = 0;
let two = 0;

io.on('connection', (socket) => {
    // console.log(io.engine.clientsCount);
    socket.on('join-room', (inviteCode, name) => {
        socket.join(inviteCode);
        console.log(inviteCode);

        players.push({ name: name, score: 0 });
        console.log(players);

        if (players.length >= 4) {
            io.to(inviteCode).emit('start-game', true);
        }

        io.to(socket.id).emit('successMessage', inviteCode); // to a particular client with id = socket.id    
        // socket.broadcast.emit('successMessage', inviteCode);  // to all clients except sender
        // io.emit('successMessage', inviteCode); //  to every single client connected
        // socket.to(inviteCode).emit('successMessage', inviteCode);   // to everyone in room inviteCode other than sender

    });

    socket.on('option-picked', (name, option, id) => {
        responses.push({name: name, option: option, id: id});
        console.log(responses);
        if(option === 1) {
            one++;
        }
        else {
            two++;
        }
        console.log(one, two);
        if(responses.length == 4) {
            // io.to(inviteCode).emit('score-returned', responses)
            console.log('hello');
            if(one === 0 && two === 4) {
                for(let i = 0; i < 4; i++)
                {
                    io.to(responses[i].id).emit('score-returned', -25);
                    let temp = players.find(c => c.name == responses[i].name);
                    temp.score = temp.score - 25;
                }
            } 
            else if(one == 1 && two == 3) {
                // let temp = responses.find(c => c.name == name)
                for(let i = 0; i < 4; i++)
                {
                    let s;
                    if(responses[i].option == 1) {
                        s = -25;
                    }
                    else {
                        s = 25;
                    }
                    io.to(responses[i].id).emit('score-returned', s);
                    let temp = players.find(c => c.name == responses[i].name);
                    temp.score = temp.score + s;
                }
            } 
            else if(one == 2 && two == 2) {
                // let temp = responses.find(c => c.name == name);
                for (let i = 0; i < 4; i++) {
                    let s;
                    if (responses[i].option == 1) {
                        s = -12.5;
                    }
                    else {
                        s = 50;
                    }
                    io.to(responses[i].id).emit('score-returned', s);
                    let temp = players.find(c => c.name == responses[i].name);
                    temp.score = temp.score + s;
                }
            } 
            else if(one == 3 && two == 1) {
                // let temp = responses.find(c => c.name == name);
                for (let i = 0; i < 4; i++) {
                    let s;
                    if (responses[i].option == 1) {
                        s = 0;
                    }
                    else {
                        s = 75;
                    }
                    io.to(responses[i].id).emit('score-returned', s);
                    let temp = players.find(c => c.name == responses[i].name);
                    temp.score = temp.score + s;
                }
            } 
            else {
                for (let i = 0; i < 4; i++) 
                {
                    io.to(responses[i].id).emit('score-returned', 25);
                    let temp = players.find(c => c.name == responses[i].name);
                    temp.score = temp.score + 25;
                }
            }
            responses = [];
            one = 0;
            two = 0;
        }
    })
    
    socket.on('check-scores', () => {
        console.log(players);
        socket.emit('get-scores', players);
    })
    
})
