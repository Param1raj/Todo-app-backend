const mongoose = require('mongoose');

const TodoModel = mongoose.model("Todo",{
    taskname:String,
    status:String,
    tag:String,
    user_id:String
})

module.exports = {TodoModel};