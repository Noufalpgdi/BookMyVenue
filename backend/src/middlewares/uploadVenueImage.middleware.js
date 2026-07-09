const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            path.join(
                __dirname,
                "../uploads/venues"
            )
        );

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname;

        cb(
            null,
            uniqueName
        );

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (
        allowedTypes.includes(
            file.mimetype
        )
    ) {
        cb(null, true);
    }
    else {

        cb(
            new Error(
                "Only image files are allowed"
            ),
            false
        );

    }
};

const uploadVenueImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = uploadVenueImage;