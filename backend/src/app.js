const express = require('express');
const path = require("path");
const cors = require('cors');
const router=require('./routes/index');
const errorMiddleware = require('./middlewares/error.middleware');


const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173'
    })
);

app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.get("/", (req, res) => {
    res.status(200).json({
        "status":"UP",
        "version":"1.0.0"
    });
});
app.use("/api/v1",router);
app.use(errorMiddleware);

module.exports=app;