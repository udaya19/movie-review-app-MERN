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

exports.updateMovieWithOutPoster = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.json(400, {
        error: "Invalid movie id",
      });
    }
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.json(404, {
        error: "Movie not found",
      });
    }
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
    } = req.body;
    movie.title = title;
    movie.storyLine = storyLine;
    movie.tags = tags;
    movie.releaseDate = releaseDate;
    movie.status = status;
    movie.type = type;
    movie.genres = genres;
    movie.cast = cast;
    movie.trailer = trailer;
    movie.language = language;
    if (director) {
      if (!isValidObjectId(director)) {
        return res.json(401, {
          error: "Invalid id for director",
        });
      }
      movie.director = director;
    }
    if (writers) {
      for (let writerId of writers) {
        if (!isValidObjectId(writerId))
          return res.json(401, { error: "Invalid writer id!" });
      }

      movie.writers = writers;
    }
    await movie.save();
    return res.json(200, {
      message: "Movie is updated",
      movie,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
    });
  }
};

exports.updateMovieWithPoster = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.json(400, {
        error: "Invalid movie id",
      });
    }
    if (!req.file) {
      return res.json(400, {
        error: "Movie poster is missing",
      });
    }
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.json(404, {
        error: "Movie not found",
      });
    }
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
    } = req.body;
    movie.title = title;
    movie.storyLine = storyLine;
    movie.tags = tags;
    movie.releaseDate = releaseDate;
    movie.status = status;
    movie.type = type;
    movie.genres = genres;
    movie.cast = cast;
    movie.trailer = trailer;
    movie.language = language;
    if (director) {
      if (!isValidObjectId(director)) {
        return res.json(401, {
          error: "Invalid id for director",
        });
      }
      movie.director = director;
    }
    if (writers) {
      for (let writerId of writers) {
        if (!isValidObjectId(writerId))
          return res.json(401, { error: "Invalid writer id!" });
      }

      movie.writers = writers;
    }
    const posterId = movie.poster?.public_id;
    if (posterId) {
      const { result } = await cloudinary.uploader.destroy(posterId);
      //   if (result !== "ok") {
      //     return res.json(400, {
      //       error: "Couldnot update poster at the moment",
      //     });
      //   }
    }
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(req.file.path, {
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
    movie.poster = newPoster;
    await movie.save();
    return res.json(200, {
      message: "Movie is updated",
      movie,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
    });
  }
};
