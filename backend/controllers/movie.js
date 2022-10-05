const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");
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

exports.createMovie = async (req, res) => {
  try {
    const { body, file } = req;
    const {
      title,
      storyLine,
      director,
      releaseDate,
      status,
      type,
      genres,
      tags,
      cast,
      writers,
      poster,
      trailer,
      language,
    } = body;
    const newMovie = new Movie({
      title,
      storyLine,
      releaseDate,
      status,
      type,
      genres,
      tags,
      cast,
      poster,
      trailer,
      language,
    });
    if (director) {
      if (!isValidObjectId(director)) {
        return res.json(401, {
          error: "Invalid id for director",
        });
      }
      newMovie.director = director;
    }
    if (writers) {
      for (let writerId of writers) {
        if (!isValidObjectId(writerId))
          return res.json(401, { error: "Invalid writer id!" });
      }

      newMovie.writers = writers;
    }
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(file.path, {
      transformation: {
        width: 1280,
        height: 1280,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });
    const newPoster = { url, public_id, responsive: [] };
    const { breakpoints } = responsive_breakpoints[0];
    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        newPoster.responsive.push(secure_url);
      }
    }
    newMovie.poster = newPoster;
    await newMovie.save();
    return res.json(200, {
      newMovie,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
    });
  }
};
