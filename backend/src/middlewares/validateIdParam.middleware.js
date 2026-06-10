const AppError = require('../utils/AppError');


const validateIdParam = (
    req,
    res,
    next
)=>{
    try
    {
        const id = Number(req.params.id);
        if(!Number.isInteger(id) ||id <= 0)
        {
            throw new AppError("Invalid id",400);
        }

        req.params.id = id;

        next();
    }
    catch(error)
    {
        next(error);
    }
    
}

module.exports = validateIdParam;