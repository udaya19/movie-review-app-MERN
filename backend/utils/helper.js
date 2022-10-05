exports.handleNotFound = (req, res) => {
  return res.json(404, {
    message: "Not found",
  });
};

exports.parseData = (req, res, next) => {
  const { trailer, cast, tags, genres, writers } = req.body;
  if (trailer) req.body.trailer = JSON.parse(trailer);
  if (cast) req.body.cast = JSON.parse(cast);
  if (tags) req.body.tags = JSON.parse(tags);
  if (genres) req.body.genres = JSON.parse(genres);
  if (writers) req.body.writers = JSON.parse(writers);
  next();
};
