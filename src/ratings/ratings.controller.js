const ratings = require("../data/ratings-data");

function ratingExists(req, res, next) {
  const ratingId = Number(req.params.ratingId);
  const foundRating = res.locals.ratings.find((rating) => rating.id === ratingId);

  if (!foundRating) {
    return next({
      status: 404,
      message: `Rating id not found: ${ratingId}`,
    });
  }
  res.locals.rating = foundRating;
  return next();
}

function filterByNoteId(request, response, next) {
  const { noteId } = request.params;
  const byNoteId = noteId
    ? (rating) => rating.noteId === Number(noteId)
    : () => true;
  response.locals.ratings = ratings.filter(byNoteId);
  next();
}

function list(req, res) {
  res.json({
    data: res.locals.ratings
  });
}

function read(req, res) {
  res.json({
    data: res.locals.rating,
  });
}

module.exports = {
  list: [filterByNoteId, list],
  read: [filterByNoteId, ratingExists, read],
};
