let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
    console.log("inscription get");
    res.json({result: "BRAVO"});
});

router.post("/", function (req, res) {
    console.log("inscription post");
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const login = req.body.login;
    const password = req.body.password;
    const societe = req.body.societe;
    let user = new UtilisateurModel({Nom : nom, Prenom : prenom, Mail : mail, Societe : societe, _id : login, MdP : password});
    user.save(function (err) {
        if (err) console.log(err);
    });
});

module.exports = router;