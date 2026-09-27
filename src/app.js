const express = require("express")
const connectDB = require("./config/database")
const app= express()
const User = require("./models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const {authUser} = require("./middlewares/auth")
const authRouter = require("./routes/auth")
 


app.use(express.json())
app.use(cookieParser())
app.use("/", authRouter)



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
