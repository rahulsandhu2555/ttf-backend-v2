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
    "SELECT * FROM celebrities WHERE name = $1",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
// id, name, url, profession, dob, physical_body_info,family_info, education, category
const createCelebPage = (request, response) => {
  const {
    name,
    url,
    profession,
    dob,
    physical_body_info,
    family_info,
    education,
    category,
  } = request.body;

  pool.query(
    "INSERT INTO celebrities (name, url, profession, dob, physical_body_info,family_info, education, category) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8)",
    [
      name,
      url,
      profession,
      dob,
      physical_body_info,
      family_info,
      education,
      category,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};
const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateCelebPage = (request, response) => {
  const nameId = request.params.name;
  const {
    name,
    url,
    profession,
    dob,
    physical_body_info,
    family_info,
    education,
    category,
  } = request.body;

  pool.query(
    "UPDATE celebrities SET name = $1, url = $2, profession = $3, dob = $4, physical_body_info = $5,family_info = $6, education = $7, category = $8 WHERE name = $9",
    [
      name,
      url,
      profession,
      dob,
      physical_body_info,
      family_info,
      education,
      category,
      nameId,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Celeb modified with ID: ${nameId}`);
    }
  );
};
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
const deleteCeleb = (request, response) => {
  const name = request.params.name;

  pool.query(
    "DELETE FROM celebrities WHERE name = $1",
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
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
