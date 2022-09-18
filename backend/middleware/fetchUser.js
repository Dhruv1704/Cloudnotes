const jwt = require('jsonwebtoken');
const JWT_pass = "acd$3";

// converters webToken to data.

const fetchUser = (req, res, next)=>{
    const token = req.header('web-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token."})
    }
    try{
        const data = jwt.verify(token, JWT_pass)
        req.user = data.user
        next();
    }catch (error){
        res.status(401).send({error:"Please authenticate using a valid token."})
    }
}

module.exports = fetchUser;