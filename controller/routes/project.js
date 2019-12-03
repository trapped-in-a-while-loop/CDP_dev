let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');
var project = require('../../model/project');
var user = require('../../model/user');

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/proprietaire", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({'Proprietaire.Login': req.query.login}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Echec récupération projets";
                    return res.status(500).end();
                } else
                    return res.status(200).end(JSON.stringify(docs));
            });
        }
    });
});

route.get("/developpeur", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({'Developpeurs.Login': req.query.login}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Echec récupération projets";
                    return res.status(500).end();
                } else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

route.get("/client", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({'Clients.Login': req.query.login}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Echec récupération projets";
                    return res.status(500).end();
                } else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

route.get("/id", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({_id: req.query.id}).lean().exec(function (err, docs) {
                if (err) {
                    res.statusMessage = "Echec récupération projet";
                    return res.status(500).end();
                } else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

route.post("/", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: errorConnect});
        else{
            var login = req.body.login;
            user.userModel.findOne({Login: login}).lean().exec(function(err, docs){
                if(err){
                    res.statusMessage = "Echec récupération infos proprietaire";
                    return res.status(500).end();
                }else{
                    var proprietaire = new user.userModel(docs);
                    var titre = req.body.titre;
                    var description = req.body.description;
                    var newProject = new project.projectModel({Titre:titre, Description:description, Proprietaire:login});
                    newProject.Proprietaire = proprietaire;
                    newProject.save(function(err){
                        if(err){
                            console.log(err);
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
        }
    });
});

route.delete("/", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: errorConnect});
        else{
            var id = req.body.id;
            project.projectModel.findByIdAndRemove(id, function(err){
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

route.put("/", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        }else{
            project.projectModel.findOne({_id:req.body.id}, function(err, doc){
                if(err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id";
                    return res.status(500).end();
                }else{
                    const titre = req.body.titre;
                    const description = req.body.description;
                    project.projectModel.update({_id:req.body.id},
                        {
                            Titre : titre,
                            Description : description
                        }, function(err, result){
                        if(err){
                            mongoose.connection.close();
                            res.statusMessage = "Echec de la mise à jour du projet";
                            return res.status(500).end();
                        }else {
                            mongoose.connection.close();
                            return res.status(200).end();
                        }
                    });
                }
            });
        }
    });
});

route.put("/developpeur", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        }else{
            project.projectModel.findOne({_id:req.body.id}, function(err, doc){
                if(err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id";
                    return res.status(500).end();
                }else{
                    const developpeur = req.body.developpeur;
                    if(doc.Proprietaire.Login.localeCompare(developpeur)===0){
                        mongoose.connection.close();
                        res.statusMessage = "Le proprietaire ne peut être développeur";
                        return res.status(500).end();
                    }
                    if(doc.Clients.find(element => element.Login.localeCompare(developpeur)===0) !== undefined){
                        mongoose.connection.close();
                        res.statusMessage = "Ce compte est déjà un client";
                        return res.status(500).end();
                    }
                    if(doc.Developpeurs.find(element => element.Login.localeCompare(developpeur)===0) !== undefined){
                        mongoose.connection.close();
                        res.statusMessage = "Ce compte est déjà un développeur";
                        return res.status(500).end();
                    }
                    user.userModel.findOne({Login:developpeur}, function(err, dev){
                        if(err){
                            mongoose.connection.close();
                            res.statusMessage = "Developpeur inexistant";
                            return res.status(500).end();
                        }else if(dev){
                            doc.Developpeurs.push(dev);
                            doc.save(function(err){
                                if(err){
                                    console.log(err);
                                    res.statusMessage = "Echec de l'ajout du développeur'";
                                    mongoose.connection.close();
                                    return res.status(500).end();
                                }else{
                                    mongoose.connection.close();
                                    res.statusMessage = "Ajout du développeur réussi";
                                    return res.status(201).end();
                                }
                            });
                        }else{
                            mongoose.connection.close();
                            res.statusMessage = "Client inexistant";
                            return res.status(201).end();
                        }
                    });
                }
            });
        }
    });
});

route.put("/client", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        }else{
            project.projectModel.findOne({_id:req.body.id}, function(err, doc){
                if(err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id";
                    return res.status(500).end();
                }else{
                    const client = req.body.client;
                    if(doc.Proprietaire.Login.localeCompare(client)===0){
                        mongoose.connection.close();
                        res.statusMessage = "Le proprietaire ne peut être développeur";
                        return res.status(500).end();
                    }
                    if(doc.Clients.find(element => element.Login.localeCompare(client)===0) !== undefined){
                        mongoose.connection.close();
                        res.statusMessage = "Ce compte est déjà un client";
                        return res.status(500).end();
                    }
                    if(doc.Developpeurs.find(element => element.Login.localeCompare(client)===0) !== undefined){
                        mongoose.connection.close();
                        res.statusMessage = "Ce compte est déjà un développeur";
                        return res.status(500).end();
                    }
                    user.userModel.findOne({Login:client}, function(err, client){
                        if(err){
                            mongoose.connection.close();
                            res.statusMessage = "Echec récupération infos client";
                            return res.status(500).end();
                        }else if (client){
                            doc.Clients.push(client);
                            doc.save(function(err){
                                if(err){
                                    console.log(err);
                                    res.statusMessage = "Echec de l'ajout du client'";
                                    mongoose.connection.close();
                                    return res.status(500).end();
                                }else{
                                    mongoose.connection.close();
                                    res.statusMessage = "Ajout du client réussi";
                                    return res.status(201).end();
                                }
                            });
                        }else{
                            mongoose.connection.close();
                            res.statusMessage = "Client inexistant";
                            return res.status(201).end();
                        }
                    });
                }
            });
        }
    });
});

module.exports = route;