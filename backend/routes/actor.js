const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actor");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");
router.post(
  "/create",
  isAuth,
  isAdmin,
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
router.get("/search", actorController.searchActor);
router.get("/latest-records", actorController.getLatestActors);
router.get("/single/:id", actorController.getSingleActor);
module.exports = router;
