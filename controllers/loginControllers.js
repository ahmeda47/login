const db = require("../models");
const path = require("path");
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.post("/", function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(function() {
      res.redirect("/dashboard");
    });
  });

  app.post("/login", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(data) {
      if (!data) {
        res.redirect("/");
      } else {
        res.redirect("/dashboard");
      }
    });
  });
};
