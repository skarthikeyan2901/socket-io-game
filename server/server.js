// const { Server } = require('socket.io');
console.log('Connected');

const PORT = 3001;

const io = require('socket.io')(PORT, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    },
})

io.on('connection', (socket) => {
    socket.on('join-room', (inviteCode) => {
        socket.join(inviteCode);
    })
})
