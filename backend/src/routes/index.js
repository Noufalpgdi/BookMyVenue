const express = require('express');
const authRouter = require('../modules/auth/auth.router');
const venuRouter = require('../modules/venue/venue.router');

const router=express.Router();

router.use("/auth",authRouter);
router.use("/venue",venuRouter);

module.exports=router;