const express = require("express");
const env = require('dotenv');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
env.config();

console.log(process.env)

const connection_url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.shack.mongodb.net/MessageDB?retryWrites=true&w=majority`;
const ConnectMongoDB = async ()=>{
  await  mongoose.connect(connection_url)
    .then(() => {
      console.log('Connected to database !!');
    })
    .catch((err)=>{
      console.log('Connection failed !!'+ err.message);
    });
}
ConnectMongoDB();

const messageSchema = new mongoose.Schema({
  name : { type : String },
  mailId : { type : String },
  subject : { type : String },
  message : { type : String },
  date : { type : String }
});
const Message = mongoose.model("Message", messageSchema);

function getCurrentDate(){
  const current = new Date();
  const cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  const cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  const dateTime = cDate + ' ' + cTime;
  return(dateTime);
}


app.get("/" , function(req, res){
    Message.find({})
    .exec((error, allmessage) => {
      if(error){
        res.render("index",{
          allMessages : []
        });
      }
      if(allmessage){
        res.render("index",{
          allMessages : allmessage
        })
      }
    });
});

app.get("/delete/:msgId", (req, res)=>{
   const messageId = req.params.msgId;
   Message.deleteOne({ _id: messageId }, (err) => {
       res.redirect("/");
   })
})

app.post("/mailResponse",function(req,res){

    const newMessage = new Message({
       name : req.body.userName,
       mailId : req.body.userEmail,
       subject : req.body.userSubject,
       message : req.body.userMsg,
       date : getCurrentDate()
    });

    newMessage.save((error, message)=>{
      if(error){
        res.render("failed");
      }
      if(message){
        res.render("success", {
          senderName : message.name
        });
      }
    })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port ,function(){
    console.log("server is successfully running");
});