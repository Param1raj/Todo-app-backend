const express = require("express");
const { connection } = require("./config/db");
const {UserRouter} = require("./routes/user.route");
const {TodoRouter} = require("./routes/Todo.route");
const { Authentication } = require("./Middlewares/Authenticatio");
require('dotenv').config();
const app = express();
const cors = require("cors");
app.use(express.json());
app.use('/user',UserRouter);

app.get("/",(req,res)=>{
    console.log(req.ip);
    res.send("Ok");
})

app.use(cors({
    origin:'*'
}));

app.use(Authentication);
app.use("/todo",TodoRouter);
app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("DB Connected with mongo")
    } catch (error) {
        console.log(error);
        console.log("Not Connected Successfully");
    }
})
