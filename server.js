const express = require("express");
const db = require("./models");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
//var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("/public"));

// const path = require("path");
// app.use("/static", express.static(path.join(__dirname, "public")));

require("./controllers/loginControllers.js")(app);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(`connected to http://localhost:${PORT}`);
  });
});
