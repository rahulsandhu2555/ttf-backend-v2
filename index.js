const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/celeb/:name", db.getCelebByName);
app.post("/celeb", db.createCelebPage);
app.put("/celeb/:name", db.updateCelebPage);
app.delete("/celeb/:name", db.deleteCeleb);
app.get("/users", db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
