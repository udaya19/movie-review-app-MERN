const express = require("express");
const movieController = require("../controllers/movie");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo } = require("../middlewares/multer");
const router = express.Router();

router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  movieController.uploadTrailer
);
module.exports = router;
