const jwt=require("jsonwebtoken");
require('dotenv').config()

const cartAuthenticate= (req,res,next)=>{
    const token=req.headers.authorization;

    if(token){
        try {
            const decoded= jwt.verify(token,process.env.key);
            if(decoded){
                const userId= decoded.userId;
                console.log(decoded);
                req.body.userId=userId;
                next()
            }else{
                res.send("wrong credentials")
            }
        } catch (error) {
            res.send("wrong credentials")
        }
    }else{
        res.send("wrong credentials")
    }
}

module.exports={
    cartAuthenticate
}
