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

const url = 'http://localhost:3000/project/';

const login = readCookie("login");

//Owned projects
fetch(url + "proprietaire?login=" + login)
    .then(function (res) {
        if (res.status === 200) {
            res.json().then(function (data) {
                let cpt = 0;
                data.forEach(item => {
                    document.querySelector("#projects").innerHTML += item["Titre"];
                    let deleteButton = document.createElement("a");
                    deleteButton.setAttribute("type", "button");
                    deleteButton.setAttribute("id", "delete_"+cpt);
                    deleteButton.setAttribute("class", "btn btn-danger");
                    deleteButton.innerHTML = "Supprimer";

                    let editButton = document.createElement("a");
                    editButton.setAttribute("type", "button");
                    editButton.setAttribute("id", "edit_"+cpt);
                    editButton.setAttribute("class", "btn btn-primary");
                    editButton.innerHTML = "Éditer";

                    let manageButton = document.createElement("a");
                    manageButton.setAttribute("type", "button");
                    manageButton.setAttribute("id", "manage_"+cpt);
                    manageButton.setAttribute("class", "btn btn-info");
                    manageButton.innerHTML = "Gérer";

                    document.addEventListener('click', function(e){
                        if(e.target && e.target.id.split("_")[0].localeCompare("delete")===0) {
                            const index = parseInt(e.target.id.split("_")[1], 10);
                            const id = data[index]["_id"];
                            document.cookie = "id=" + id + "; path=./*";
                            document.location.href = "deleteproject.html";
                        }
                        else if(e.target && e.target.id.split("_")[0].localeCompare("edit")===0) {
                            const index = parseInt(e.target.id.split("_")[1], 10);
                            const id = data[index]["_id"];
                            document.cookie = "id=" + id + "; path=./*";
                            document.location.href = "editproject.html";
                        }
                        else if(e.target && e.target.id.split("_")[0].localeCompare("manage")===0) {
                            const index = parseInt(e.target.id.split("_")[1], 10);
                            const id = data[index]["_id"];
                            document.cookie = "id=" + id + "; path=./*";
                            document.location.href = "manageproject.html";
                        }
                    });

                    document.querySelector('#projects').append(deleteButton, editButton, manageButton);
                    document.querySelector("#projects").append(document.createElement("br"));
                    cpt ++;
                });
            });
        } else
            alert(res.statusText);
    }).catch(function (err) {
    console.log(err.message);
});

function displayNoOnwerProjects(addr) {
    fetch(addr)
        .then(function (res) {
            if (res.status === 200) {
                res.json().then(function (data) {
                    var result = "";
                    var cpt = 0;
                    data.forEach(item => result += item["Titre"] + "\n");
                    document.querySelector("#projects").innerHTML += result;
                });
            } else
                alert(res.statusText);
        }).catch(function (err) {
        console.log(err.message);
    });
}

displayNoOnwerProjects(url + "developpeur?login=" + login);
displayNoOnwerProjects(url + "client?login=" + login);