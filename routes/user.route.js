const express = require('express');
const {UserModel} = require("../Models/user.model");
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
UserRouter.post("/signup",async (req,res)=>{
    let {email,password} = req.body;
    let IP = req.ip;
    try {
        let user = await UserModel.find({email});
        if(user.length===0){
            bcrypt.hash(password, 4,async function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    console.log(err);
                    res.send({"msg":"Something wents wrong"});
                }
                else {
                    let data = await UserModel({email,password:hash,IP});
                    data.save();
                    res.send({"msg":"Successfully Sign-up"})
                }
            });
        }else {
            res.status(400).send({"msg":"User Already exist,Please try login"})
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something wents wrong!"})
    }
})

UserRouter.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    try {
        let user = await UserModel.find({email});
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(result){
                    var token = jwt.sign({ id: user[0]._id}, 'hush');
                    res.send({"msg":"Successful Login","token":token})
                }else{
                    res.send({"msg":"Something wents wrong."});
                }
            });
        }else {
            res.send({"msg":"Please Sign up!"})
        }
    } catch (error) {
        ress.send({"msg":"Something wents wrong"});
        console.log(error)
    }
})

module.exports = {UserRouter};