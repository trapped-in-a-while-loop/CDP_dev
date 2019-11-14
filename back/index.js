const express = require("express");
const app = express();
//const InMemoryUser = require("./inMemoryUser");
const path = require("path");
const ejs = require("ejs");
let bodyParser = require("body-parser");

let mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "/front"));
//app.use(express.static(path.join(__dirname, "..", "css")));

console.log("Get connexion ...");

let con = mysql.createConnection({
    database: 'gestionnaire',
    host: 'localhost',
    user: 'root',
    password: 'test'
});

con.connect(function (err) {
    console.log("Connecté!");
});

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/indexcon", function (req, res) {
    res.render("indexcon");
});

app.get("/inscription", function (req, res) {
    console.log("inscription get");
    res.render("inscription");
});

app.post("/inscription", function (req, res) {
    console.log("inscription post");
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const login = req.body.login;
    const password = req.body.password;
    const societe = req.body.societe;
    let sql = "INSERT INTO utilisateur VALUES ('" + nom + "','" + prenom + "','" + mail + "','" + societe + "','" + login + "','" + password + "');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Utilisateur créé");
    });
    res.render("index")
});

app.get("/connexion", function (req, res) {
    console.log("connexion");
    res.render("connexion");
});

app.post("/connexion", function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    let sql = "SELECT Prenom, Nom FROM utilisateur WHERE Login = '" + login + "' AND MotdePasse = '" + password + "';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            const prenom = result[0].Prenom;
            const nom = result[0].Nom;
            console.log(prenom + " " + nom);
        }else {
            console.log("Login ou mot de passe faux");
        }
    });
    res.render("indexcon");
});

app.listen(3000, function () {
    console.log("Gestion de projet on port 3000");
});