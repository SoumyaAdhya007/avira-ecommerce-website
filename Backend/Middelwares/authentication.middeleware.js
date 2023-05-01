
const jwt = require('jsonwebtoken')
require('dotenv').config();

const authentication=(req,res,next)=>{
    let token = req.headers.authorization;
    if(!token){
        return res.status(401).send({ message: 'Access Denied' })
    }
    jwt.verify(token, process.env.key, async (err, decoded)=>{
        try {
            if (err) {
                return res.status(404).send({ msg: err.message })
            }else{
                req.body.token=decoded;

                next()
            }
            
        } catch (error) {
            res.status(404).send({ msg: error })
        }
    })
}
module.exports = {
    authentication
}