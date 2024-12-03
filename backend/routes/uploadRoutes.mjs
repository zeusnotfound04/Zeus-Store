import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/"); // Destination folder
    },
    filename(req, file, cb) {
        const extname = path.extname(file.originalname); // Get file extension
        cb(null, `${file.fieldname}-${Date.now()}${extname}`); // Filename format
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
  
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Images only"), false);
    }
  };

// Multer setup with file size limit (10MB)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit to 10MB
});
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
    console.log("Form data:", req.body); // Log the form fields (non-file data)
    console.log("Uploaded file field:", req.file); // Log the file data (should be under `image`)
    uploadSingleImage(req, res, (err) => {
        if (err) {
            console.log(err)
            // Check if the error is due to file size limit
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send({ message: "File size exceeds the 10MB limit" });
            }
            return res.status(400).send({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).send({ message: "No image provided" });
        }

        res.status(200).send({
            message: "Image uploaded successfully",
            imagePath: `/${req.file.path}`,
        });
    });
});

export default router;

