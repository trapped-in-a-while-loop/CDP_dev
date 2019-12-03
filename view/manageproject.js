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

fetch("http://localhost:3000/project/id?id="+readCookie("id")).then(function(res){
    res.json().then(function(res) {
        res[0]["Developpeurs"].forEach(dev => {
            var oneDev = document.createElement("p");
            var content = dev["Login"] + ", " + dev["Nom"] + ", " + dev["Prenom"];
            oneDev.innerHTML = content;
            var but = document.createElement("a");
            but.type = "button";
            but.className = "btn btn-danger";
            but.href = "deletemember.html";
            but.innerHTML = "Supprimer";
            oneDev.appendChild(but);
            document.querySelector("#devs").appendChild(oneDev);
        });
        res[0]["Clients"].forEach(client => {
            var oneClient = document.createElement("p");
            var content = client["Login"] + ", " + client["Nom"] + ", " + client["Prenom"];
            oneClient.innerHTML = content;
            var but = document.createElement("a");
            but.type = "button";
            but.className = "btn btn-danger";
            but.href = "deletemember.html";
            but.innerHTML = "Supprimer";
            oneClient.appendChild(but);
            document.querySelector("#clients").appendChild(oneClient);
        });
    });
});

document.querySelector("#cancel").addEventListener("click", onClick);
document.querySelector("#saveDeveloppeur").addEventListener("click", onClickDeveloppeur);
document.querySelector("#saveClient").addEventListener("click", onClickClient);

function onClickDeveloppeur() {
    if (document.cookie.includes("id=")){
        const url = 'http://localhost:3000/project/developpeur';
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        const developpeur = document.querySelector("#developpeur").value;

        var params = { id: id, developpeur: developpeur };

        var my_init = {
            method: 'PUT',
            headers: my_headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(function (res) {
                if (res.status === 201) {
                    alert("Développeur ajouté");
                    document.location.reload();
                }
                else
                    alert(res.statusText);
            }).catch(function (err) {
            console.log(err.message);
        });
    }
}

function onClickClient() {
    if (document.cookie.includes("id=")) {

        const url = 'http://localhost:3000/project/client';
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        const client = document.querySelector("#client").value;

        var params = { id: id, client: client };

        var my_init = {
            method: 'PUT',
            headers: my_headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(function (res) {
                if (res.status === 201) {
                    alert("Client ajouté");
                    document.location.reload();
                }
                else
                    alert(res.statusText);
            }).catch(function (err) {
            console.log(err.message);
        });
    }
}

function onClick(){
    document.cookie = 'id=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
    document.location.href = "myprojects.html";
}