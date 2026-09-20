const mongoose = require("mongoose")


const connectDB = async ()=>{
 mongoose.connect("mongodb+srv://yogeshnanvate_db_user:2c70shgvNp2HzC1K@clusterdemo.ffizbbo.mongodb.net/devTinder")
}

module.exports =connectDB