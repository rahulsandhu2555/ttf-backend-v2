// import {fetchCelebrity} from "../utils/celebrity.utils";
// import Celebrity from '../models/celebrity.model';
const Celebrity = require("../models/celebrity.model")

const getCelebrity = async (req, res) => {
    try {
        const celeb_id = req.params.celeb_id;
        let celeb = await Celebrity.findOne({ celeb_id });
        // const celeb = await fetchCelebrity(celeb_id);
        res.status(200).json({
            ...celeb
        });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};

const addCelebrity = async (req, res) => {
    if (!req.body.url) {
        res.status(400).send({ message: "Url can not be empty!" });
        return;
    }

    // Create a Tutorial
    const celebrity = new Celebrity({
        name: req.body.name,
        url: req.body.url,
        profile_pic: req.body.profile_pic
    });

    // Save Tutorial in the database
    celebrity
        .save(celebrity)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
}


// const fetchSubs = async (req, res, next) => {
//     try {
//         const tmdb_id = req.params.tmdb_id;
//         const movie = await fetchTMDB(tmdb_id);
//         const subs = await fetchYTS(
//             movie.imdb_id,
//             ["Arabic", "French", "English"],
//             __dirname + `/../assets/captions/${tmdb_id}`
//         );
//         next();
//     } catch (error) {
//         res.json([{ msg: error.message }]);
//     }
// };

const getSub = async (req, res, next) => {
    const languages = { en: "English", fr: "French", ar: "Arabic" };
    try {
        res.sendFile(`/assets/captions/51876${languages[req.params.language]}.vtt`, {
            root: __dirname + "/..",
        });
    } catch (error) {
        res.status(400).json([{ msg: error.message }]);
    }
};

module.exports = { getCelebrity, getSub, addCelebrity };
