const jwt=require("jsonwebtoken");
require('dotenv').config()

const authenticate= (req,res,next)=>{
    const token=req.headers.authorization;

    if(token){
        try {
            const decoded= jwt.verify(token,process.env.key);
            if(decoded){
                const adminId= decoded.adminId;
                console.log(decoded);
                req.body.adminId=adminId;
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
    authenticate
}
