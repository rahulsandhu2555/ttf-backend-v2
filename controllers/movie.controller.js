const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");


const getMovie = async (req, res) => {
    try {
        const movie_id = req.params.movie_id;
        let celeb = await Movie.findOne({url: movie_id }).lean();
        res.status(200).json({
            ...celeb
        });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};

const addMovie = async (req, res) => {
    try {
        if (!req.body.url) {
            res.status(400).send({ message: "Url can not be empty!" });
            return;
        }
        let celeb = await Movie.findOne({url: req.body.url });
        if(celeb !== null){
            res.status(400).json({ msg: 'Check Url' });
            return
        }

        const movie = new Movie({
            name: req.body.name,
            certificate: req.body.certificate,
            language: req.body.language,
            other_names: req.body.other_names,
            url: req.body.url,
            genre: req.body.genre,
            runtime: req.body.runtime,
            celebrity: req.body.celebrity,
            release: req.body.release,
            trailer: req.body.trailer,
            teaser: req.body.teaser,
            poster: req.body.poster,
            thumbnail: req.body.thumbnail,
            rating: req.body.rating,
            cost_collection: req.body.cost_collection,
            reviews: req.body.reviews,
            where_to_watch: req.body.where_to_watch
        });

        movie
            .save(movie)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding the movie."
                });
            });

    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};

const updateMovie = async (req, res) => {
    try {
        if (!req.body.url) {
            res.status(400).send({ message: "Url can not be empty!" });
            return;
        }
        const movie = await Movie.findOneAndUpdate({url: req.body.url },
            {
            name: req.body.name,
            certificate: req.body.certificate,
            language: req.body.language,
            other_names: req.body.other_names,
            url: req.body.url,
            genre: req.body.genre,
            runtime: req.body.runtime,
            celebrity: req.body.celebrity,
            release: req.body.release,
            trailer: req.body.trailer,
            teaser: req.body.teaser,
            poster: req.body.poster,
            thumbnail: req.body.thumbnail,
            rating: req.body.rating,
            cost_collection: req.body.cost_collection,
            reviews: req.body.reviews,
            where_to_watch: req.body.where_to_watch
        });

        res.status(200).json({
            msg: "Movie updated!"
        });

    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};
const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        let celeb = await Movie.findOneAndDelete({url: id });
        if(celeb !== null){
            res.status(200).json({
                msg: "Movie deleted"
            });
            return
        }
        res.status(200).json({
            msg: "No Movie found"
        });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};
const checkMovieUrl = async (req, res) => {
    try {
        const id = req.params.id;
        let celeb = await Movie.findOne({url: id });
        if(celeb === null){
            res.json({ valid: true });
            return
        }
        res.status(200).json({
            valid: false
        });
    } catch (error) {
        res.json({ valid: false });
    }
};

module.exports = { addMovie, updateMovie, getMovie, deleteMovie, checkMovieUrl };
