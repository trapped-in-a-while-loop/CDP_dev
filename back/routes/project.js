let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    Titre : { type: String, required: true},
    Description : { type: String},
    Login : { type: String, required: true}
});
var projectModel = mongoose.model('project', projectSchema, 'project');

/*
route.get("/", function(req, res){
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: "Connexion BDD impossible"});
        else{
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
*/

route.post("/", function (req, res) {
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: "Connexion BDD impossible"});
        else{
            var titre = req.body.titre;
            var description = req.body.description;
            var login = req.body.login;
            var project = new projectModel({Titre:titre, Description:description, Login:login});
            project.save(function(err){
                if(err){
                    res.statusMessage = "Echec de la création du projet";
                    mongoose.connection.close();
                    return res.status(500).end();
                }else{
                    mongoose.connection.close();
                    res.statusMessage = "Création du projet réussie";
                    return res.status(201).end();
                }
            });
        }
    });
});

module.exports = route;