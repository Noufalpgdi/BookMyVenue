const venuController = require('../venue/venue.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/role.middleware');
const validateIdParam = require('../../middlewares/validateIdParam.middleware');
const uploadVenueImage = require('../../middlewares/uploadVenueImage.middleware');
const express = require('express');

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    uploadVenueImage.single("image"),
    venuController.create
);

router.get("/",venuController.getAll);

router.get(
    "/my-venues",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    venuController.getMyVenues
)

router.get(
    "/pending",
    authMiddleware,
    authorize("ADMIN"),
    venuController.getAllPendingApprovalVenues);

    
router.get("/:id",venuController.getById);



router.patch(
    "/:id",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    uploadVenueImage.single("image"),
    validateIdParam,
    venuController.updateVenue
);

router.patch(
    "/:id/approve",
    authMiddleware,
    authorize("ADMIN"), 
    venuController.approveVenue);

router.patch(
    "/:id/reject",
    authMiddleware,
    authorize("ADMIN"), 
    venuController.rejectVenue);

router.delete(
    "/:id",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    validateIdParam,
    venuController.deleteVenue
)

router.patch(
    "/:id/activate",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    venuController.activate
);

router.patch(
    "/:id/deactivate",
    authMiddleware,
    authorize("OWNER","ADMIN"),
    venuController.deactivate
);

module.exports = router;