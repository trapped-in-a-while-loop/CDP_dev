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

document.querySelector("#cancel").addEventListener("click", onClick);
document.querySelector("#ok").addEventListener("click", onClickOk);

function onClickOk() {
    if (document.cookie.includes("id=")) {

        var url = 'http://localhost:3000/project';
        const my_headers = new Headers();
        my_headers.append("Content-Type", "application/json");

        const id = readCookie("id");
        var login = readCookie("client");
        var params = { id: id, client: login };
        if(!login){
            login = readCookie("developpeur");
            url += "/developpeur";
            params = {id: id, developpeur: login};
        }else
            url += "/client";

        var my_init = {
            method: 'DELETE',
            headers: my_headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(params)
        };

        fetch(url, my_init)
            .then(function (res) {
                if (res.status === 200) {
                    alert("Membre supprimé");
                    document.cookie = 'client=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
                    document.cookie = 'developpeur=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
                    document.location.href = "manageproject.html";
                }
                else
                    alert(res.statusText);
            }).catch(function (err) {
            console.log(err.message);
        });

    }
}

function onClick(){
    document.cookie = 'client=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
    document.cookie = 'developpeur=no_id; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
    document.location.href = "manageproject.html";
}