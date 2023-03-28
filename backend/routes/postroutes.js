const  express  = require("express");
const  connectdb  = require("../db/db");
const  Comment  = require("../models/commentSchema");

const  router  =  express.Router();

router.route("/getcomment").get((req, res, next) =>  {
        res.setHeader("Content-Type", "application/json");
        res.statusCode  =  200;
        connectdb.then(db  =>  {
            Comment.find({}).then(chat  =>  {
            res.json(chat);
        });
    });
});

router.post("/postdata",async(req,res)=>{

   
    const message = new Comment({...req.body})
    try {
        const savedMessage = await message.save()
        res.status(201).send(savedMessage)

    }catch (e) {
        res.status(404).send("error occured")
    }
})

module.exports  =  router;