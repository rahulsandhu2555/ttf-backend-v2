const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ttf",
  password: "ttf",
  port: 5432,
});
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCelebByName = (request, response) => {
  const name = request.params.name;

  pool.query(
    "SELECT * FROM celebrities WHERE url = $1",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createCelebPage = (request, response) => {
  const {
    name,
    url,
    profile_pic,
    citizenship,
    gender,
    type,
    languages,
    birth,
    personal,
    religion,
    hobbies,
    profession,
    family,
    education,
    relationships,
    marriages,
    relatives,
    facts,
    category,
  } = request.body;

  pool.query(
    "INSERT INTO celebrities (name, url, profile_pic,  citizenship,    gender,    type,    languages,    birth,    personal,    religion,    hobbies,    profession,    family,    education,    relationships,    marriages,    relatives,    facts,    category) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17,$18,$19)",
    [
      name,
      url,
      profile_pic,
      citizenship,
      gender,
      type,
      JSON.stringify(languages),
      JSON.stringify(birth),
      JSON.stringify(personal),
      JSON.stringify(religion),
      JSON.stringify(hobbies),
      JSON.stringify(profession),
      JSON.stringify(family),
      JSON.stringify(education),
      JSON.stringify(relationships),
      JSON.stringify(marriages),
      JSON.stringify(relatives),
      JSON.stringify(facts),
      category,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Celeb added`);
    }
  );
};

const updateCelebPage = (request, response) => {
  const urlId = request.params.name;
  const {
    name,
    url,
    profile_pic,
    citizenship,
    gender,
    type,
    languages,
    birth,
    personal,
    religion,
    hobbies,
    profession,
    family,
    education,
    relationships,
    marriages,
    relatives,
    facts,
    category,
  } = request.body;

  pool.query(
    "UPDATE celebrities SET name = $1, url = $2, profile_pic = $3, citizenship = $4, gender = $5,type = $6, languages = $7, birth = $8, personal = $9, religion = $10, hobbies = $11, profession = $12, family = $13, education = $14, relationships = $15, marriages = $16, relatives = $17, facts = $18, category = $19 WHERE url = $20",
    [
      name,
      url,
      profile_pic,
      citizenship,
      gender,
      type,
      JSON.stringify(languages),
      JSON.stringify(birth),
      JSON.stringify(personal),
      JSON.stringify(religion),
      JSON.stringify(hobbies),
      JSON.stringify(profession),
      JSON.stringify(family),
      JSON.stringify(education),
      JSON.stringify(relationships),
      JSON.stringify(marriages),
      JSON.stringify(relatives),
      JSON.stringify(facts),
      category,
      urlId,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Celeb modified`);
    }
  );
};
const deleteCeleb = (request, response) => {
  const name = request.params.name;

  pool.query(
    "DELETE FROM celebrities WHERE url = $1",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Celeb deleted with ID: ${name}`);
    }
  );
};

module.exports = {
  getUsers,
  getCelebByName,
  createCelebPage,
  updateCelebPage,
  deleteCeleb,
};
