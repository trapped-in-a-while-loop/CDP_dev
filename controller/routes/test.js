let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');
var test = require('../../model/test');

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/", function (req, res) {
    mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        } else {
            test.testModel.find({ 'IDProjet': req.query.idprojet }).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Échec récupération tests";
                    return res.status(500).end();
                } else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

route.post("/", function (req, res) {
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err)
            return res.status(500).json({ message: errorConnect });
        else {
            var idprojet = req.body.idprojet;
            var given = req.body.given;
            var when = req.body.when;
            var then = req.body.then;
            var test = new test.testModel({ IDProjet: idprojet, testGiven: given, testWhen: when, testThen: then });
            test.save(function (err) {
                if (err) {
                    res.statusMessage = "Échec de la création du test";
                    mongoose.connection.close();
                    return res.status(500).end();
                } else {
                    mongoose.connection.close();
                    res.statusMessage = "Création du test réussie";
                    return res.status(201).end();
                }
            });
        }
    });
});

route.put("/", function (req, res) {
    return mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        } else {
            test.testModel.findOne({ _idprojet: req.body.idprojet }, function (err, doc) {
                if (err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id projet";
                    return res.status(500).end();
                } else {
                    const testgiven = req.body.testgiven;
                    const testwhen = req.body.testwhen;
                    const testthen = req.body.testthen;
                    test.testModel.update({ _idprojet: req.body.idprojet },
                        {
                            testGiven: testgiven,
                            testWhen: testwhen,
                            testThen: testhen
                        }, function (err, result) {
                            if (err) {
                                mongoose.connection.close();
                                res.statusMessage = "Echec de la mise à jour du test";
                                return res.status(500).end();
                            } else {
                                mongoose.connection.close();
                                return res.status(200).end();
                            }
                        });
                }
            });
        }
    });
});

module.exports = route;