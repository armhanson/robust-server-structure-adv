const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./notes.controller");

const ratingsRouter = require("../ratings/ratings.router");

router.use("/:noteId/ratings", controller.noteExists, ratingsRouter);

// router.use("/:noteId/ratings/:ratingId", controller.noteExists, ratingsRouter);

router
  .route("/:noteId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
