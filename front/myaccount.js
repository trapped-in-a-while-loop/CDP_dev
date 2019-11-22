function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const url = 'http://localhost:3000/user';

const login = readCookie("login");
const mdp = readCookie("mdp");

fetch(url+"?login="+login+"&mdp="+mdp)
    .then(function(res)
    {
        if(res.status === 200) {
            res.json().then(function(data){
                document.querySelector("#nom").value = data["Nom"];
                document.querySelector("#prenom").value = data["Prenom"];
                document.querySelector("#mail").value = data["Mail"];
                document.querySelector("#login").value = data["Login"];
                document.querySelector("#societe").value = data["Societe"];
            });
        }else
            alert(res.statusText);
    }).catch(function(err){
    console.log(err.message);
});