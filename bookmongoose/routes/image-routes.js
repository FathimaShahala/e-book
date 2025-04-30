const multer = require("multer");
const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "public/img/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  const originalname = req.file.originalname;
  res.status(201).json({
    message: "Image uploaded successfully",
    link: `http://localhost:3000/img/${originalname}`,
  });
});

module.exports = router;
