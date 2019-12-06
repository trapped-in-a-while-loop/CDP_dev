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

const url = 'http://localhost:3000/task?id=';

const id = readCookie("id");

let cpt = 0;

function setColor(elem, status){
    switch(status){
        case 'todo':
            elem.style.color = "#ff0000";
            break;
        case 'pending':
            elem.style.color = "#000000";
            break;
        case 'done':
            elem.style.color = "#00ff00";
            break;
    }
}

fetch(url + id)
    .then(function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                datas.forEach(elem => {
                    var br1 = document.createElement("br");
                    var br2 = document.createElement("br");

                    var titre = document.createElement("b");
                    titre.innerHTML = elem["Titre"];

                    var row = document.createElement("div");
                    row.setAttribute("class", "row");

                    var col41 = document.createElement("div");
                    col41.setAttribute("class", "col-sm-4");
                    col41.innerHTML = elem["Description"];

                    var col42 = document.createElement("div");
                    col42.setAttribute("class", "col-sm-4");

                    var col43 = document.createElement("div");
                    col43.setAttribute("class", "col-sm-4");

                    var status = document.createElement("b");
                    status.innerHTML = elem["Statut"].toUpperCase();
                    setColor(status, elem["Statut"]);

                    var del = document.createElement("a");
                    del.setAttribute("type", "button");
                    del.setAttribute("class", "btn btn-danger");
                    del.innerHTML = "Supprimer";

                    var edit = document.createElement("a");
                    edit.setAttribute("type", "button");
                    edit.setAttribute("class", "btn btn-primary");
                    edit.innerHTML = "Éditer";

                    col42.append(status);
                    col43.append(del, edit);
                    row.append(col41, col42, col43);

                    document.querySelector("#tasks").append(br1, titre, br2, row);
                });
            });
        } else
            alert(res.statusText);
    }).catch(function (err) {
    console.log(err.message);
});