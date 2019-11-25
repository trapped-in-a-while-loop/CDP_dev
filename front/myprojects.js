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
                var result = "";
                var cpt = 0;
                data.forEach(item => {
                    result += item["Titre"]+"\n" +
                        "        <a type=\"button\" id=\"delete" + cpt + "\" class=\"btn btn-danger\">Supprimer</a>\n" +
                        "        <a type=\"button\" id=\"edit" + cpt + "\" class=\"btn btn-primary\">Editer</a>\n" +
                        "        <a type=\"button\" id=\"manage" + cpt + "\" class=\"btn btn-info\">Gérer</a></br>";
                    cpt += 1;
                });
                cpt -= 1;
                var globCpt = cpt;
                document.querySelector("#projects").innerHTML = result;
                while(cpt>=0){
                    document.querySelector("#delete"+cpt).addEventListener('click', function(){

                        const id = data[globCpt]["_id"];
                        document.cookie = "id="+id+"; path=./*";
                        document.location.href = "deleteproject.html"
                        globCpt -= 1;
                    });
                    cpt -= 1;
                }
            });
        }else
            alert(res.statusText);
    }).catch(function(err){
    console.log(err.message);
});