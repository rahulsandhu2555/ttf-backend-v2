const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
const celebRoute = require( './routes/celebrity.routes');
const connectDB = require("./config/connectDB");

connectDB();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// routes
app.use("/celebrity", celebRoute);

app.get("/celeb/:name", db.getCelebByName);
app.post("/celeb", db.createCelebPage);
app.put("/celeb/:name", db.updateCelebPage);
app.delete("/celeb/:name", db.deleteCeleb);
app.get("/users", db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
process.on("SIGINT", () => process.exit(1));
