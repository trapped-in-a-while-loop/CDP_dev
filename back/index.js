const express = require("express");
const app = express.Router();
//const InMemoryUser = require("./inMemoryUser");
const path = require("path");
const ejs = require("ejs");
let bodyParser = require("body-parser");

let mongoose = require('mongoose');

let logConnected = "";

app.use(bodyParser.urlencoded({ extended: false }));

//app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "..", "/front"));
//app.use(express.static(path.join(__dirname, "..", "css")));

console.log("Get connexion ...");

/*con.connect(function (err) {
    console.log("Connecté!");
});*/

let UtilisateurSchema = new mongoose.Schema({
    Nom : {type: String, required: true},
    Prenom : {type: String, required: true},
    Mail : {type: String, unique: true, required: true},
    Societe : {type: String, required: false},
    _id : {type: String, unique: true, required: true},
    MdP : {type: String, required: true}
});

let UtilisateurModel = new mongoose.model('Utilisateur', UtilisateurSchema, 'Utilisateur');

app.get("/", function (req, res) {
    router.get('/', function (req, res, next) {
        mongoose.connect("mongodb+srv://edupland:IXbRIqduk9asZ1o@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err)
                console.log(err);
            else {
                res.render("index");
            }
        });
    });
});

app.get("/connected", function (req, res) {
    console.log("login connecté : " + logConnected);
    res.render("connected");
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
    let user = new UtilisateurModel({Nom : nom, Prenom : prenom, Mail : mail, Societe : societe, _id : login, MdP : password});
    user.save(function (err) {
        if (err) console.log(err);
        else res.render("index");
    });
});

app.get("/connexion", function (req, res) {
    console.log("connexion");
    res.render("connexion");
});

app.post("/connexion", function (req, res) {
    /*const login = req.body.login;
    const password = req.body.password;
    let sql = "SELECT Prenom, Nom FROM utilisateur WHERE Login = '" + login + "' AND MotdePasse = '" + password + "';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result[0]);
            const prenom = result[0].Prenom;
            const nom = result[0].Nom;
            logConnected = login;
            console.log(prenom + " " + nom);
        } else {
            console.log("Login ou mot de passe faux");
        }
    });*/
    res.render("connected");
});

app.listen(3000, function () {
    console.log("Gestion de projet on port 3000");
});