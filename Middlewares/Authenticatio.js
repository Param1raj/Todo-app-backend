const jwt = require("jsonwebtoken");


const Authentication = (req,res,next)=>{
    let token = req.headers?.authorization?.split(" ")[1];
    console.log(token);
    if(token){
        jwt.verify(token, 'hush', function(err, decoded) {
            if (err) {
              console.log(err)
              res.send("Internal error");
            }else if(decoded){
                 // console.log(decoded)
                 let user_id = decoded.id;
                 req.body.user_id = user_id;
                 next();
             }else {
                res.send("Please Login");
            }
          });
          
    }else {
        res.send("Please Login");
    }
}

module.exports = {Authentication};