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

const url = 'http://localhost:3000/project';

const login = readCookie("login");

fetch(url+"?login="+login)
    .then(function(res)
    {
        if(res.status === 200) {
            res.json().then(function(data){
                result = "";
                data.forEach(item => {
                    result += item["Titre"]+"\n" +
                        "        <a type=\"button\" class=\"btn btn-danger\" href=\"deleteproject.html\">Supprimer</a>\n" +
                        "        <a type=\"button\" class=\"btn btn-primary\" href=\"editproject.html\">Editer</a>\n" +
                        "        <a type=\"button\" class=\"btn btn-info\" href=\"manageproject.html\">Gérer</a></br>";
                });
                document.querySelector("#projects").innerHTML = result;
            });
        }else
            alert(res.statusText);
    }).catch(function(err){
    console.log(err.message);
});