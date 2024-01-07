const express = require("express");
const server = express();
// cors are for allowing server to connect frontend react server to backend express server
const cors = require('cors')
//now we are able to receive body part of frontend into express
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//------------------->>>>>>>>>>>>>>>>>>>>>>>>>   database  <<<<<<<<<<<<<<<<<<<<<<--------------------

mongoose.connect("mongodb://127.0.0.1:27017/demo").then(()=>{
    console.log("db connection");
}).catch((error)=>{
    console.log(error);
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema)


//------------------->>>>>>>>>>>>>>>>>>>>>>>>>   node express  <<<<<<<<<<<<<<<<<<<<<<--------------------
server.use(cors());
server.use(bodyParser.json())
//CRUD - Create
server.post('/demo',async (req,res)=>{
    //storing data into dtabase
    let user = new User()
    user.username = req.body.name;
    user.password = req.body.password;
    const doc = await user.save()
    console.log(doc);
    //now our data from backend will send back to frontend again(res.send or res.json)
    // res.send('hello')
    // res.json(req.body)
    res.json(doc)
    console.log(req.body);
})


//after storing data and sending response to frontend now our data from database will send back to frontend again(res.send or res.json)
server.get('/demo',async (req,res)=>{
   const docs = await User.find({})
   res.json(docs)
})



server.listen(8080,()=>{
    console.log("running");
} )