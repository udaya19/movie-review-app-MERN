const { isValidObjectId } = require("mongoose");
const Actor = require("../models/actor");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dtoguorry",
  api_key: "528411381656446",
  api_secret: "hhESrXn2l4bVAaEtok_b2SXengQ",
  secure: true,
});
exports.createActor = async (req, res) => {
  try {
    const { name, about, gender } = req.body;
    const { file } = req;
    const newActor = new Actor({ name, about, gender });
    if (file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { gravity: "face", height: 150, width: 150, crop: "thumb" }
      );
      newActor.avatar = { url: secure_url, public_id };
    }
    await newActor.save();
    return res.status(200).json({
      id: newActor._id,
      name,
      about,
      gender,
      avatar: newActor.avatar?.url,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
    });
  }
};

exports.updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.json(400, {
      error: "Invalid object id",
    });
  }
  const actor = await Actor.findById(id);
  if (!actor) {
    return res.json(400, {
      error: "Invalid actor",
    });
  }
  const public_id = actor.avatar?.public_id;
  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok") {
      return res.json(400, {
        error: "Couldnot remove image from the cloud",
      });
    }
  }
  if (file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { gravity: "face", height: 150, width: 150, crop: "thumb" }
    );
    actor.avatar = { url: secure_url, public_id };
  }
  actor.name = name;
  actor.about = about;
  actor.gender = gender;
  await actor.save();
  return res.status(200).json({
    id: actor._id,
    name,
    about,
    gender,
    avatar: actor.avatar?.url,
  });
};
