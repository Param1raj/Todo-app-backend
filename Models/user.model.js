
const mongoose = require("mongoose");

const UserModel = mongoose.model("user",{
    email:String,
    password:String,
    IP:String
})
module.exports = {UserModel};