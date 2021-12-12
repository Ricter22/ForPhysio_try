const path = require('path');
const express = require('express');
const http = require('http');
const moment = require('moment');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const userFromDb = require('./models/userModel');

//database connection
mongoose.connect('mongodb+srv://ric:mobilecomputing2122@cluster0.finip.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(()=>{
    console.log('Database connected...');
}).catch(err=>{
    console.log(err);
    })

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

io.on('connection', socket =>{
    console.log('user connected');

    socket.on('msg', msg =>{
        console.log(msg);
        io.emit('msg', msg);
    })
})

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));