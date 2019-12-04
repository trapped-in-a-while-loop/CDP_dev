let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');
var issue = require('../../model/issue');

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/", function(req, res) {
  mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function (err) {
    if (err) {
      res.statusMessage = errorConnect;
      return res.status(500).end();
    } else {
      issue.issueModel.find({'IDProjet': req.query.idprojet}).lean().exec(function (err, docs) {
        if (err) {
          console.log(err);
          res.statusMessage = "Échec récupération issues";
          return res.status(500).end();
        } else
          return res.end(JSON.stringify(docs));
      });
    }
  });
});

route.post("/", function (req, res) {
  mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function (err) {
    if (err)
      return res.status(500).json({message: errorConnect});
    else {
      var idprojet = req.body.idprojet;
      var role = req.body.role;
      var action = req.body.action;
      var raison = req.body.raison;
      var issue = new issue.issueModel({IDProjet: idprojet, Role: role, Action: action, Raison: raison});
      issue.save(function (err) {
        if (err) {
          res.statusMessage = "Échec de la création de l'issue";
          mongoose.connection.close();
          return res.status(500).end();
        }else{
          mongoose.connection.close();
          res.statusMessage = "Création de l'issue réussie";
          return res.status(201).end();
        }
      });
    }
  });
});

route.put("/", function (req, res) {
  mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology:true}, function (err){
    if (err)
      return res.status(500).json({message: errorConnect});
    else {
      issue.issueModel.findOne({_idprojet:req.body.idprojet}, function(err, doc) {
        if (err) {
          mongoose.connection.close();
          res.statusMessage = "Echec vérification id projet";
          return res.status(500).end();
        }else {
          const role = req.body.role;
          const action = req.body.action;
          const raison = req.body.raison;
          issue.issueModel.update({_idprojet:req.body.idprojet},
            {
              Role : role,
              Action : action,
              Raison : raison
            }, function(err, result) {
              if (err) {
                mongoose.connection.close();
                res.statusMessage = "Echec de la mise à jour de l'issue";
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

module.exports = route;