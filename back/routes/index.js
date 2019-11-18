let express = require('express');
let app = express.Router();

let mongoose = require('mongoose');

let UtilisateurSchema = new mongoose.Schema({
    Nom : {type: String, required: true},
    Prenom : {type: String, required: true},
    Mail : {type: String, required: true},
    Societe : {type: String, required: false},
    _id : {type: String, unique: true, required: true},
    MdP : {type: String, required: true}
});

let UtilisateurModel = new mongoose.model('Utilisateur', UtilisateurSchema, 'Utilisateur');

app.get("/", function(req, res, next) {
    mongoose.connect("mongodb+srv://edupland:IXbRIqduk9asZ1o@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) console.log(err);
        
})