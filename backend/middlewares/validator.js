const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const genres = require("../utils/genres");
exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
];

exports.actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Actor name is missing"),
  check("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("About is a required field"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gender is a required field"),
];

exports.validateMovie = [
  check("title").trim().not().isEmpty().withMessage("Movie is missing"),
  check("storyLine")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Story line is missing"),
  check("releaseDate").isDate().withMessage("Release date is missing"),
  check("language")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Language title is missing"),
  check("status")
    .isIn(["public", "private"])
    .withMessage("Status must be public or private"),
  check("type").trim().not().isEmpty().withMessage("Type is missing"),
  check("genres")
    .isArray()
    .withMessage("Genre must be an array of strings.")
    .custom((value) => {
      for (let g of value) {
        if (!genres.includes(g)) {
          throw new Error("Invalid genres!");
        }
      }
      return true;
    }),
  check("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be array of strings")
    .custom((tags) => {
      for (let tag of tags) {
        if (typeof tag !== "string") {
          throw new Error("Tags must be string");
        }
      }
      return true;
    }),
  check("cast")
    .isArray()
    .withMessage("Cast must be an array of strings.")
    .custom((cast) => {
      for (let c of cast) {
        if (!isValidObjectId(c.actor)) throw new Error("Invalid cast id");
        if (!c.roleAs?.trim()) throw new Error("Role is missing");
        if (typeof c.leadActor !== "boolean") {
          throw new Error(
            "Only boolean values are accepted for lead actor inside cast"
          );
        }
      }
      return true;
    }),
  check("trailer")
    .isObject()
    .withMessage("Trailer must be an object with url and public id")
    .custom(({ url, public_id }) => {
      try {
        const result = new URL(url);
        if (!result.protocol.includes("http")) {
          throw new Error("Trailer url is invalid");
        }
        return true;
      } catch (error) {
        throw new Error("Trailer url is invalid");
      }
    }),
  // check("poster").custom((_, { req }) => {
  //   if (!req.file) {
  //     throw new Error("Poster file is missing");
  //   }
  //   return true;
  // }),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  console.log(error);
  if (error.length) {
    return res.json(400, { error: error[0].msg });
  }
  next();
};
