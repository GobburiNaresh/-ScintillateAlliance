const express = require('express');
const path=require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const chatController = require('./controllers/chatController');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Homepage', 'Homepage.html'));
});


const server = app.listen(port,() => {
    console.log("App is listening on port 3000");
})


const io = require('socket.io')(server);


io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on('sendMessage', (data) => {
        chatController.sendMessage(data.message, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            io.emit('message', { message: data.message });
        });
    });
});

////


const candidates = {
    "0": {votes: 0,label: 'Javascript', color:randomRGB()},
    "1": {votes: 0,label: 'C#', color:randomRGB()},
    "2": {votes: 0,label: 'Java', color:randomRGB()},
    "3": {votes: 0,label: 'Python', color:randomRGB()},
    "4": {votes: 0,label: 'PHP', color:randomRGB()}
}

io.on('connection', (socket) => {
    console.log("A new client has been connected");

    io.emit('update', candidates);

    socket.on('vote', (index) => {
        if(candidates[index]){
            candidates[index].votes +=1;
        }
        io.emit("update",candidates);
    });
});

function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}, ${r()}, ${r()})`;
}
