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

function newUser() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const mail = document.getElementById('mail').value;
    const societe = document.getElementById('societe').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    let user = new UtilisateurModel({ Nom: nom, Prenom: prenom, Mail: mail, Societe: societe, _id: login, MdP: password });
    user.save(function (err) {
        if (err) console.log(err);
    });
}

const button = document.querySelector('button');
button.addEventListener('click', newUser);
