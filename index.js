const express = require("express");
// const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
const celebRoute = require( './routes/celebrity.routes');
const movieRoute = require('./routes/movie.routes')
const connectDB = require("./config/connectDB");

// app.use(cors());

connectDB();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.options('*', cors());
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
// routes
app.use("/celebrity", celebRoute);
app.use("/movie", movieRoute);

app.get("/celeb/:name", db.getCelebByName);
app.post("/celeb", db.createCelebPage);
app.put("/celeb/:name", db.updateCelebPage);
app.delete("/celeb/:name", db.deleteCeleb);
app.get("/users", db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
process.on("SIGINT", () => process.exit(1));
