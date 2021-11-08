const express = require("express");
const {getCelebrity} = require("../controllers/celebrity.controller");
// import {auth} from '../middlewares/auth'
// import {getMovie,getSub} from "../controllers/movie.controller"


const router = express.Router();

router.route("/:celeb_id").get(getCelebrity);
// router.route("/subs/:tmdb_id/:language").get(getSub);



module.exports = router;