const jwt = require('jsonwebtoken');

// converters webToken to data.

const fetchUser = (req, res, next)=>{
    const token = req.header('web-token');
    if(!token){
        res.status(401).json({
            type:"error",
            message:"Please authenticate using a valid token."}
        )
    }
    try{
        const data = jwt.verify(token, process.env.JWT_PASS)
        req.user = data.user
        next();
    }catch (error){
        res.status(401).json({
            type:"error",
            message:"Please authenticate using a valid token."}
        )
    }
}

module.exports = fetchUser;
