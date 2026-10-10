const express= require("express");
const profileRouter = express.Router();

const { userAuth} = require("../middlewares/auth");
const { validEditUserData } = require("../utils/validation");


profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        const user = await req.user;
        console.log(user)
        res.send(user);
    }
    catch(err){
        return res.status(400).send("ERROR: " + err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
    try{

      if(!validEditUserData(req))
     {
          return res.status(400).send("Invalid user edit fields")
     }
     const loginUser=req.user;

     Object.keys(req.body).forEach((key)=>(loginUser[key]=req.body[key]))
      await loginUser.save()
        return res.status(200).send("Profile updated successfully")
    
    } catch (err){
        return res.status(400).send("ERROR: " + err.message);
    }

})

module.exports = profileRouter;