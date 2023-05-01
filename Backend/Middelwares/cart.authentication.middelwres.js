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
                res.status(400).send({msg:"Access Denied"})
            }
        } catch (error) {
            res.status(404).send({msg:error})
        }
    }else{
        res.status(400).send({msg:"Access Denied"})
    }
}

module.exports={
    cartAuthenticate
}
