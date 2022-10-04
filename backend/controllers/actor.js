const Actor = require("../models/actor");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dtoguorry",
  api_key: "528411381656446",
  api_secret: "hhESrXn2l4bVAaEtok_b2SXengQ",
  secure: true,
});
exports.createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const newActor = new Actor({ name, about, gender });
};
