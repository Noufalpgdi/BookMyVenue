const authService=require('./auth.service');

const register= async (req,res,next)=>{
    try{
        const result = await authService.register(req.body);
        //if(!result.success)
        //{
            //return res.status(400).json(result);
        //}
        res.status(201).json(result);
    }
    catch(error)
    {
        //res.status(500).json({
            //success:false,
            //message:error.message
        //});
        next(error);
    }
    
}
const login= async (req,res,next)=>{
    try
    {
        const result = await authService.login(req.body);
        //if(!result.success)
        //{
            //return res.status(400).json(result);
        //}
        res.status(200).json(result);
    }
    catch(error)
    {
        //res.status(500).json({
            //success:false,
            //message:error.message
        //});
        next(error);
    }
    
}

const getProfile  = async (req,res,next)=>{
    try
    {
        const result = await authService.getProfile(req.user.userId);
        //if(!result.success)
        //{
            //return res.status(404).json(result);
        //}
        res.status(200).json(result);
    }
    catch(error)
    {
        //res.status(500).json({
            //success:false,
            //message:error.message
        //});
        next(error);
    }
    
}

module.exports={
    register,
    login,
    getProfile 
}