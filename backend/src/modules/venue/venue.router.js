const venuController = require('../venue/venue.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/role.middleware');
const validateIdParam = require('../../middlewares/validateIdParam.middleware')
const express = require('express');

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    venuController.create
);

router.get("/",venuController.getAll);

router.get("/:id",venuController.getById);


router.put(
    "/:id",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    validateIdParam,
    venuController.updateVenue
);
router.delete(
    "/:id",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    validateIdParam,
    venuController.deleteVenue
)

module.exports = router;