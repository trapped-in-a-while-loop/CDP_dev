function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===" ") c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

fetch("http://localhost:3000/project/id?id="+readCookie("id")).then(async function(res){
    let cpt=0;
    res.json().then(async function(res) {
        res[0]["Developpeurs"].forEach(dev => {
            let oneDev = document.createElement("p");
            const content = dev["Login"] + ", " + dev["Nom"] + ", " + dev["Prenom"];
            oneDev.innerHTML = content;
            let but = document.createElement("a");
            but.type = "button";
            but.className = "btn btn-danger";
            but.href = "deletemember.html";
            but.innerHTML = "Supprimer";
            but.id = "delDev_"+cpt;
            oneDev.appendChild(but);
            document.querySelector("#devs").appendChild(oneDev);
            cpt++;
        });
        res[0]["Clients"].forEach(client => {
            let oneClient = document.createElement("p");
            const content = client["Login"] + ", " + client["Nom"] + ", " + client["Prenom"];
            oneClient.innerHTML = content;
            let but = document.createElement("a");
            but.type = "button";
            but.className = "btn btn-danger";
            but.href = "deletemember.html";
            but.innerHTML = "Supprimer";
            but.id = "delClient_"+cpt;
            oneClient.appendChild(but);
            document.querySelector("#clients").appendChild(oneClient);
            cpt++;
        });
        document.addEventListener("click", function(e){
            if(e.target && e.target.id.split("_")[0].localeCompare("delDev")===0) {
                const index = parseInt(e.target.id.split("_")[1], 10);
                const login = res[0]["Developpeurs"][index];
                document.cookie = "developpeur=" + login + "; path=./*";
                document.location.href = "deletemember.html";
            }else if(e.target && e.target.id.split("_")[0].localeCompare("delClient")===0) {
                const index = parseInt(e.target.id.split("_")[1], 10);
                const login = res[0]["Clients"][index];
                document.cookie = "client=" + login + "; path=./*";
                document.location.href = "deletemember.html";
            }
        });
    });
});

document.querySelector("#cancel").addEventListener("click", onClick);
document.querySelector("#saveDeveloppeur").addEventListener("click", onClickDeveloppeur);
document.querySelector("#saveClient").addEventListener("click", onClickClient);

function onClickDeveloppeur() {
    if (document.cookie.includes("id=")){
        const url = backUrl+"project/developpeur";
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        const developpeur = document.querySelector("#developpeur").value;

        const params = { id: id, developpeur: developpeur };

        const my_init = {
            method: "PUT",
            headers: my_headers,
            mode: "cors",
            cache: "default",
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

        const url = backUrl+"project/client";
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        const client = document.querySelector("#client").value;

        const params = { id: id, client: client };

        const my_init = {
            method: "PUT",
            headers: my_headers,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(async function (res) {
                if (res.status === 201) {
                    await Swal.fire({
                        icon: "error",
                        text: "Client ajouté"
                    });
                    document.location.reload();
                }
                else
                    await Swal.fire({
                        icon: "error",
                        text: res.statusText
                    });
            }).catch(function (err) {
            console.log(err.message);
        });
    }
}

function onClick(){
    document.cookie = "id=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*";
    document.location.href = "myprojects.html";
}