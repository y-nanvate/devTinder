const mongoose = require("mongoose")


const connectDB = async ()=>{
 mongoose.connect("mongodb+srv://yogeshnanvate_db_user:0pP7sTZr6q5IAAVT@clusternew.twxdhtc.mongodb.net/DevTinderData")
}

module.exports =connectDB