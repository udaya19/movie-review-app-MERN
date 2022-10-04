const cloudinary = require("cloudinary").v2;
exports.uploadTrailer = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.json(400, {
      error: "Video file is missing",
    });
  }
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      resource_type: "video",
    }
  );
  return res.json(200, { url, public_id });
};
