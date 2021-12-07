// import {fetchCelebrity} from "../utils/celebrity.utils";
// import Celebrity from '../models/celebrity.model';
const Celebrity = require("../models/celebrity.model")

const getCelebrity = async (req, res) => {
    try {
        const celeb_id = req.params.celeb_id;
        let celeb = await Celebrity.findOne({url: celeb_id }).lean();
        res.status(200).json({
            ...celeb
        });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};
const deleteCelebrity = async (req, res) => {
    try {
        const celeb_id = req.params.celeb_id;
        let celeb = await Celebrity.findOneAndDelete({url: celeb_id });
        if(celeb !== null){
            res.status(200).json({
                msg: "Celeb deleted"
            });
            return
        }
        res.status(200).json({
            msg: "No celeb found"
        });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};
const updateCelebrity = async (req, res) => {
    try {
        let celeb = await Celebrity.findOneAndUpdate({url: req.body.url },
            {
                name: req.body.name,
                url: req.body.url,
                profile_pic: req.body.profile_pic,
                citizenship: req.body.citizenship,
                gender: req.body.gender,
                type: req.body.type,
                languages: req.body.languages,
                birth: req.body.birth,
                personal: req.body.personal,
                religion: req.body.religion,
                hobbies: req.body.hobbies,
                profession: req.body.profession,
                family: req.body.family,
                education: req.body.education,
                relationships: req.body.relationships,
                marriages: req.body.marriages,
                relatives: req.body.relatives,
                facts: req.body.facts,
                category: req.body.category
            }
            ).lean();
        res.status(200).json({
            msg: "Celeb updated!"
        });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};
const checkCelebUrl = async (req, res) => {
    try {
        const celeb_id = req.params.url;
        let celeb = await Celebrity.findOne({url: celeb_id });
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

const addCelebrity = async (req, res) => {
    if (!req.body.url) {
        res.status(400).send({ message: "Url can not be empty!" });
        return;
    }
    let celeb = await Celebrity.findOne({url: req.body.url });
    if(celeb !== null){
        res.status(400).json({ msg: 'Check Url' });
        return
    }

    // Create a Tutorial
    const celebrity = new Celebrity({
        name: req.body.name,
        url: req.body.url,
        profile_pic: req.body.profile_pic,
        citizenship: req.body.citizenship,
        gender: req.body.gender,
        type: req.body.type,
        languages: req.body.languages,
        birth: req.body.birth,
        personal: req.body.personal,
        religion: req.body.religion,
        hobbies: req.body.hobbies,
        profession: req.body.profession,
        family: req.body.family,
        education: req.body.education,
        relationships: req.body.relationships,
        marriages: req.body.marriages,
        relatives: req.body.relatives,
        facts: req.body.facts,
        category: req.body.category
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

module.exports = { getCelebrity, getSub, addCelebrity, checkCelebUrl,updateCelebrity, deleteCelebrity };
