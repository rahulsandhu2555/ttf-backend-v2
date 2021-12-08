const express = require("express");
const router = express.Router();
const {addMovie, updateMovie, getMovie, deleteMovie, checkMovieUrl} = require("../controllers/movie.controller");

router.route("/:movie_id").get(getMovie);
router.route("/:id").delete(deleteMovie);
router.route("").post(addMovie);
router.route("/check-movie-url/:id").get(checkMovieUrl);
router.route("").put(updateMovie);

module.exports = router;