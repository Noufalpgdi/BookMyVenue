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

const getAll = async (req,res)=>{
    try
    {
        const result = await venuService.getAll();
        return res.status(200).json(result);
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

const getById = async (req,res)=>{
    try
    {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid venue id"
            });
        }
        const result = await venuService.getById(id);

        if(!result.success)
        {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
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
    create,
    getAll,
    getById
}