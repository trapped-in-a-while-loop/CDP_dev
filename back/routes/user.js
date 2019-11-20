let mongoose = require('mongoose');

let UtilisateurSchema = new mongoose.Schema({
    Nom : {type: String, required: true},
    Prenom : {type: String, required: true},
    Mail : {type: String, required: true},
    Societe : {type: String, required: false},
    Login : {type: String, unique: true, required: true},
    MdP : {type: String, required: true}
});

let UtilisateurModel = new mongoose.model('Utilisateur', UtilisateurSchema, 'Utilisateur');

app.post("/user:create", function(req, res)
{
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const societe = req.body.societe;
    const login = req.body.login;
    const password = req.body.password;
    let user = new UtilisateurModel({ Nom: nom, Prenom: prenom, Mail: mail, Societe: societe, Login: login, MdP: password });
    user.save(function (err) {
        if (err) console.log(err);
    });
})