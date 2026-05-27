const prisma=require('../../config/prisma');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const SALT_ROUNDS = 10;

const register=async (userData)=>{
    const {name,email,password}=userData;
    if(!name || !email || !password)
    {
        return {
            "success":false,
            "message":"All fields are required"
        }
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser=await prisma.user.findUnique({
        where:{
            email:normalizedEmail
        }
    });
    if(existingUser)
    {
         return {
            "success":false,
            "message":"User already exists"
        }
    }
    if(password.length < 8)
    {
        return {
            success:false,
            message:"Password must be at least 8 characters"
        }
    }
    
    const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);
    const new_user= await prisma.user.create({
        data:{
            name,
            email:normalizedEmail,
            password:hashedPassword
        }
        
    });
    return {
            "success":true,
            "message":"User registered successfully",
            "user":{
                "id":new_user.id,
                "name":new_user.name,
                "email":new_user.email
            }
    }
}

const login= async (userData)=>{
    const {email,password}=userData;
    if(!email || !password)
    {
        return {
            "success":false,
            "message":"Email and password are required"
        }
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
        where:{email:normalizedEmail}
    });
    if(!user)
    {
        return{
            "success":false,
            "message":"Invalid email or password"
        }
    }
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );
    if(!isPasswordValid)
    {
        return{
            "success":false,
            "message":"Invalid email or password"
        }
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
            "success":true,
            "message":"User logged in successfully",
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
        return {
            success:false,
            message:"User Not Found"
        }
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