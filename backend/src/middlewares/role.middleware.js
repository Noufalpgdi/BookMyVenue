const authorize  = (userRoles)=>{
    return (req,res,next)=>{
        try
        {
            if(!userRoles.includes(req.user.role))
            {
                return res.status(403).json({
                    success:false,
                    message:"Access denied"
                });
            }
            next();
        }
        catch(error)
        {
            return res.status(500).json({
                success:false,
                message:error.message
            });
        }
    }
    
    
}
module.exports = authorize;