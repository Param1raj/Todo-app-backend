const mongoose = require('mongoose');

const TodoModel = mongoose.model("Todo",{
    taskname:String,
    status:String,
    tag:String
})

module.exports = {TodoModel};