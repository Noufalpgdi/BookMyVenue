const venuController = require('../venue/venue.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/role.middleware');
const express = require('express');

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    venuController.create
);

module.exports = router;