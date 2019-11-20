let express = require('express');
let app = express.Router();

app.get("/", function (req, res) {
    console.log("connexion get");
});

app.post("/", function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
});