require('dotenv').config();


if(!process.env.JWT_SECRET)
{
    throw new Error("JWT_SECRET environment variable is missing");
} 

const app = require('./app');

const port_number=process.env.PORT || 5000

app.listen(port_number,()=>{
    console.log(`Server is up and running on the port ${port_number}`);
});