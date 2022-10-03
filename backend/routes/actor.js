const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actor");
router.post("/create", actorController.createActor);
module.exports = router;
