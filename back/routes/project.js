let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    Titre : { type: String, required: true},
    Description : { type: String},
    Login : { type: String, required: true}
});
var projectModel = mongoose.model('project', projectSchema, 'project');

route.get("/", function(req, res){
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statutMessage = "Connexion BDD impossible";
            return res.status(500).end();
        }else{
            projectModel.find({Login:req.query.login}).lean().exec(function (err, docs) {
                if(err) {
                    res.statusMessage = "Echec récupération projets";
                    return res.status(500).end();
                }else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

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

route.delete("/", function (req, res) {
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: "Connexion BDD impossible"});
        else{
            var id = req.body.id;
            projectModel.findByIdAndRemove(id, function(err){
                if(err){
                    res.statusMessage = "Echec de la suppression du projet";
                    mongoose.connection.close();
                    return res.status(500).end();
                }else{
                    mongoose.connection.close();
                    res.statusMessage = "Suppression du projet réussie";
                    return res.status(200).end();
                }
            });
        }
    });
});

module.exports = route;