const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actor");
const { uploadImage } = require("../middlewares/multer");
router.post(
  "/create",
  uploadImage.single("avatar"),
  actorController.createActor
);
module.exports = router;
