const app = require("express")();
const User = require("../../models/user")

app.post("/",(req,res)=>{
  
  User.findOne({email:req.body.email},(err,userfun)=>{
    if(err)
    {
      console.log(err);
    }
    else{
      if(!userfun){
        const user = new User({
          username:req.body.name,
          id:req.body.googleId,
          email:req.body.email,
          profilepic:req.body.imageUrl,
          roomId:"",
          videoTime:"",
          userType:"",
          movieName:"",
          banner:"",
          movieUrl:"",
          friends:[]
        });
        user.save();
        res.send(user);
      }
      else{
        res.send(userfun);  
      }
    }
  })
    
})

module.exports = app;