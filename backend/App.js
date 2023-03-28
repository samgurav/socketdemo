const express=require('express');
const http=require('http')
const PORT=9000;
const app=express();
const cors=require('cors')
const  connect  = require("./db/db");
const httpServer=http.createServer(app);
const {Server}=require('socket.io')
const io=new Server(httpServer)
const CommentRoutes=require('./routes/postroutes');
const Comment = require('./models/commentSchema');
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());

app.set('view engine','ejs')
app.use("/api/posts",CommentRoutes)

io.on('connection', (socket) => {
    Comment.find().then((result)=>{
        // console.log(result)
        socket.emit('output-messages',result)

    })

    socket.on('comment',async(comment)=>{
        console.log(comment)
        io.emit('comment demo', comment)
        connect.then(db  =>  {
            console.log("connected correctly to the server");
        
            let  chatMessage  = await new Comment({ chat:comment});

            chatMessage.save();
            });
       
           
        });
  
     
    //  io.on('connection', (socket) => { 
    //         console.log('new client connected');
    //     });
 });

httpServer.listen(PORT,(err)=>{
    if(err) throw err
    else{
        console.log(`working on ${PORT}`)
    }
})