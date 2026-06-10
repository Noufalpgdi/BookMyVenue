const AppError = require('./AppError');


const validateStringField = (value, fieldName)=>{
    if(typeof value !== "string")
    {
        throw new AppError(`${fieldName} must be a string`,400);
    }
    const normalizedValue = value.trim();
    if(!normalizedValue)
    {
        throw new AppError(`${fieldName} cannot be empty`,400);
    }
    return normalizedValue;
}
module.exports = {
    validateStringField
}