let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');
var task = require('../../model/task');

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/", function (req, res) {
  mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
      res.statusMessage = errorConnect;
      return res.status(500).end();
    } else {
      task.taskModel.find({'IDProjet': req.query.idprojet}).lean().exec(function (err, docs){
        if (err) {
          console.log(err);
          res.statusMessage = "Échec récupération tâches";
          return res.status(500).end();
        } else 
          return res.end(JSON.stringify(docs));
      });
    }
  });
});

route.post("/", function (req, res) {
  mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err)
      return res.status(500).json({ message: errorConnect });
    else {
      var idprojet = req.body.idprojet;
      var titre = req.body.titre;
      var description = req.body.description;
      var statut = req.body.statut;
      var task = new task.taskModel({ IDProjet: idprojet, Titre: titre, Description: description, Statut: statut });
      task.save(function (err) {
        if (err) {
          res.statusMessage = "Échec de la création de la tâche";
          mongoose.connection.close();
          return res.status(500).end();
        } else {
          mongoose.connection.close();
          res.statusMessage = "Création de la tâche réussie";
          return res.status(201).end();
        }
      });
    }
  });
});

route.put("/", function (req, res) {
  return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology:true}, function (err) {
    if (err) {
      res.statusMessage = errorConnect;
      return res.status(500).end();
    }else {
      task.taskModel.findOne({_idprojet:req.body.idprojet}, function (err, doc) {
        if (err) {
          mongoose.connection.close();
          res.statusMessage = "Echec vérification id projet";
          return res.status(500).end();
        }else {
          const titre = req.body.titre;
          const description = req.body.description;
          const statut = req.body.statut;
          task.taskModel.update({_idprojet:req.body.idprojet},
            {
              Titre : titre,
              Description : description,
              Statut : statut
            }, function (err, result) {
              if (err) {
                mongoose.connection.close();
                res.statusMessage = "Echec de la mise à jour de la tâche";
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

route.delete("/", function (req, res) {
  return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology:true}, function (err) {
    if (err)
      return res.status(500).json({message: errorConnect});
    else {
      var idprojet = req.body.idprojet;
      task.taskModel.findByIdAndRemove(idprojet, function (err) {
        if (err) {
          res.statusMessage = "Echec de la suppresion de la tâche";
          mongoose.connection.close();
          return res.status(500).end();
        }else {
          mongoose.connection.close();
          res.statusMessage = "Suppression de la tâche réussie";
          return res.status(200).end();
        }
      })
    }
  })
})

module.exports = route;