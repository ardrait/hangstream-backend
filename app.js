const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require("body-parser")
const cors = require("cors")
const io = require("socket.io")(server,{
    cors:{
        origin:'*',
    },
    
});
const {
    userJoin
} = require("./utils/users")

app.use(cors())
app.use(bodyParser.json())


const dburl = "mongodb+srv://hangstream:Muddup3ru!@cluster0.63pom.mongodb.net/hangStreamDB?retryWrites=true&w=majority"
mongoose.connect(dburl,{useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set("useCreateIndex",true);
mongoose.set('useFindAndModify', false);

const login = require("./routes/login/login.js");
app.use("/credentials",login);

const home = require("./routes/Home/init");
app.use("/home",home);

const movies = require("./routes/Movies/init");
app.use("/movies",movies);




io.on("connection",socket =>{
    console.log("connection made successfull");
    
    socket.on("join_room",payload => {
        console.log(payload,"payload");
        const user = userJoin(socket.id,payload.userName,payload.roomId);
        socket.join(user.room);
        
        io.to(user.room).emit('welcome', `${user.username}`);
    })
    
    socket.on('message',payload =>{
        console.log("message",payload);
        io.to(payload.roomId).emit('message',payload);
    });

    socket.on('timing',payload=>{
        io.to(payload.roomId).emit('timing',payload);
    });
    socket.on('typing',payload=>{
        io.to(payload.roomId).emit("typing",payload);
    })

})


server.listen(process.env.PORT || 7000,()=>{
    console.log('im using at port 7000');
})

console.log('server started');