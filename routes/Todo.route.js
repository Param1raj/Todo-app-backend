const express = require('express');
const { TodoModel } = require('../Models/Todo.model');

const TodoRouter = express.Router();

TodoRouter.get("/",async (req,res)=>{
    // res.send("ALL todos")
    // let id = req.params;
    let query = req.query;
    try {
        let Todos = await TodoModel.find(query);
        res.send(Todos);
    } catch (error) {
        console.log(error);
        res.status(404).send({"msg":"Something wents wrong"});
    }
})
TodoRouter.post("/create", async (req,res)=>{
    let payload = req.body;
    try {
        let Todo = await TodoModel(payload);
        Todo.save();
        res.send({"msg":"Successfully Added"});
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"Something wents wrong"})
    }
})

TodoRouter.patch("/update/:id",async(req,res)=>{
    let id = req.params.id;
    let payload = req.body;
    let user_id = req.body.user_id;
    try {   
        let data  = await TodoModel.find({_id:id});
        if(data.length > 0){
            if(data[0].user_id=== user_id){
                await TodoModel.findByIdAndUpdate({_id:id},payload);
                res.send({"msg":"Updated Todo Successfully"});
            }else {
                res.send({"msg":"You are not authorized for this"})
            }
        }else { 
            res.status(404).send({"msg":"Todo Not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({'msg':"Something wents wrong"});
    }
})
TodoRouter.delete("/delete/:id",async (req,res)=>{
    let id = req.params.id;
    console.log(id);
    let user_id = req.body.user_id;
    try {   
        let data  = await TodoModel.find({_id:id});
        console.log(data);
        if(data.length > 0){
            if(data[0].user_id === user_id){
                let data = await TodoModel.findByIdAndDelete({_id:id});
                res.send({"msg":"Deleted Todo Successfully"});
            }else {
                res.send("not matched");
            }
        }else { 
            res.status(404).send({"msg":"Todo Not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({'msg':"Something wents wrong"});
    }
})

module.exports= {TodoRouter};