const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")

const app= express()

app.post("/singup", async(req, res)=>{

    const user = new User({
        firstName:"Yogesh",
        lastNmae:"Nanvate",
        emailId:"yogesh@gmail.com",
        password:"yogesh@7729",
    })

    try {
        await user.save()
    res.send("User data Added Successfully.....")
    } catch (err){
        res.status(400).send("Error saving to user" + err)
    }

    

})

connectDB().then(()=>{
    console.log("database connntected")
    app.listen("7777",()=>{
    console.log("Sever started sussfully")
})
}).catch((error)=>{
console.log(error)
})

app.use((req, res)=>{
 res.send("heyy user im testing res server")
})
