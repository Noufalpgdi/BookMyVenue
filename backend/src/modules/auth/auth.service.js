const prisma = require('../../config/prisma');
const AppError = require('../../utils/AppError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

const register=async (userData)=>{
    const {name,email,password} = userData;
    if(!name?.trim() || !email?.trim() || !password?.trim())
    {
        throw new AppError("All fields are required",400);
    }
    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser=await prisma.user.findUnique({
        where:{
            email:normalizedEmail
        }
    });
    if(existingUser)
    {
        throw new AppError("User already exists",400);
    }
    const normalizedPassword = password.trim();
    if(normalizedPassword.length < 8)
    {
        throw new AppError("Password must be at least 8 characters",400);
    }
    
    const hashedPassword = await bcrypt.hash(normalizedPassword,SALT_ROUNDS);
    const new_user= await prisma.user.create({
        data:{
            name:normalizedName,
            email:normalizedEmail,
            password:hashedPassword
        }
        
    });
    return {
            success:true,
            message:"User registered successfully",
            user:{
                "id":new_user.id,
                "name":new_user.name,
                "email":new_user.email
            }
    }
}

const login= async (userData)=>{
    const {email,password}=userData;
    if(!email?.trim() || !password?.trim())
    {
        throw new AppError("Email and password are required",400);
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
        where:{email:normalizedEmail}
    });
    if(!user)
    {
        throw new AppError("Invalid email or password",401);
    }
    const normalizedPassword = password.trim();
    const isPasswordValid = await bcrypt.compare(
        normalizedPassword,
        user.password
    );
    if(!isPasswordValid)
    {
        throw new AppError("Invalid email or password",401);
    }
    const token = jwt.sign({
        userId:user.id,
        email:user.email,
        role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'1d'
        }
    );
    return {
            success:true,
            message:"User logged in successfully",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }

    }
}

const getProfile  = async (userId)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });
    if(!user)
    {
        throw new AppError("User Not Found",404);
    }
    return {
        success:true,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    }
}

module.exports={
    register,
    login,
    getProfile
}