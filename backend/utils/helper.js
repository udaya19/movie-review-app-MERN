exports.handleNotFound = (req, res) => {
  return res.json(404, {
    message: "Not founds",
  });
};
