const express = require("express");
const movieController = require("../controllers/movie");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { validateMovie, validate } = require("../middlewares/validator");
const { parseData } = require("../utils/helper");
const router = express.Router();

router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  movieController.uploadTrailer
);
router.post(
  "/create",
  //   isAuth,
  //   isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  movieController.createMovie
);
module.exports = router;
