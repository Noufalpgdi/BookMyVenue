const express = require('express');
const router=require('./routes/index');
const errorMiddleware = require('./middlewares/error.middleware');


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        "status":"UP",
        "version":"1.0.0"
    });
});
app.use("/api/v1",router);
app.use(errorMiddleware);

module.exports=app;