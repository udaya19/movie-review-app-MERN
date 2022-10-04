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
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path
    );
    newActor.avatar = { url: secure_url, public_id };
    await newActor.save();
    res.status(200).json(newActor);
  } catch (error) {
    res.json(500, {
      error: error.message,
    });
  }
};
