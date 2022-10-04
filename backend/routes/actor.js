const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actor");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");
router.post(
  "/create",
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  actorController.createActor
);

router.post(
  "/update/:id",
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  actorController.updateActor
);

router.delete("/delete/:id", actorController.deleteActor);

module.exports = router;
