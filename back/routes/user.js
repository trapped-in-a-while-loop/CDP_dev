let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    Nom : { type: String, required: true},
    Prenom : { type: String, required: true},
    Mail : { type: String, required: true},
    Societe : { type: String, required: true},
    Login : { type: String, required: true, unique: true},
    Password : { type: String, required: true}
});
var userModel = mongoose.model('user', userSchema, 'user');

route.get("/", function(req, res){
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statutMessage = "Connexion BDD impossible";
            return res.status(500).end();
        }else{
            userModel.findOne({Login:req.query.login, Password:req.query.password}, function(err, doc){
                if(err) {
                    res.statusMessage = "Echec vérification identifiants";
                    return res.status(500).end();
                }else{
                    if(doc) {
                        res.statusMessage = "OK";
                        return res.status(200).end();
                    }else{
                        res.statutMessage = "Utilisateur ou mot de passe incorrect";
                        return res.status(401).end();
                    }
                }
            });
        }
    });
});

route.post("/", function (req, res) {
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: "Connexion BDD impossible"});
        else{
            userModel.findOne({Login:req.body.login}, function(err, doc){
                if(err) {
                    res.statusMessage = "Echec vérification login";
                    return res.status(500).end();
                }else{
                    if(doc) {
                        res.statusMessage = "Utilisateur existant";
                        return res.status(409).end();
                    }else{
                        const nom = req.body.nom;
                        const prenom = req.body.prenom;
                        const mail = req.body.mail;
                        const societe = req.body.societe;
                        const login = req.body.login;
                        const mdp = req.body.mdp;
                        var user = new userModel(
                            {Nom : nom,
                                Prenom : prenom,
                                Mail : mail,
                                Societe :societe,
                                Login : login,
                                Password : mdp});
                        user.save(function (err) {
                            if(err) {
                                mongoose.connection.close(function(err){
                                    if(err) {
                                        res.statusMessage = "Fermeture connexion BDD impossible";
                                        return res.status(500).end();
                                    }else{
                                        res.statusMessage = "Echec de l'inscription";
                                        return res.status(500).end();
                                    }
                                });
                            }else {
                                mongoose.connection.close(function(err){
                                    if(err) {
                                        res.statusMessage = "Fermeture connexion BDD impossible";
                                        return res.status(500).end();
                                    }else {
                                        res.statusMessage = "Inscription réussie";
                                        return res.status(201).end();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
});

module.exports = route;