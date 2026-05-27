const venuService = require('./venue.service');

const create = async(req,res)=>{
    try
    {
        const result = await venuService.create(req.body,req.user.userId);
        if(!result.success)
        {
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {
    create
}