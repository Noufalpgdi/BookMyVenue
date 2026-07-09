const multer = require("multer");

const errorMiddleware = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Image size cannot exceed 5MB"
            });
        }
    }
    return res.status(statusCode).json({
        success:false,
        message:err.message || "Internal Server Error"
    });
}

module.exports = errorMiddleware;