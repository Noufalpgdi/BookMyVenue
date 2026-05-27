const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    try
    {
        const authorization = req.headers.authorization;
        if(!authorization)
        {
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }
        const parts = authorization.split(" ");
        if(parts.length !==2)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid token format"
            });
        }
        if(parts[0] !== "Bearer")
        {
            return res.status(400).json({
                success:false,
                message:"Invalid authorization scheme"
            });
        }
        const token = parts[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message: error.message
        });
    }
    
}

module.exports = authMiddleware;