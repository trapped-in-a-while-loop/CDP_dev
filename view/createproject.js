document.querySelector("#create").addEventListener("click", onClick);

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

function onClick()
{
    const url = backUrl+"project";

    const my_headers = new Headers();
    my_headers.append("Content-Type", "application/json");

    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const login = readCookie("login");

    const params = {titre:titre, description:description, login:login};

    const my_init = {
        method: "POST",
        headers: my_headers,
        mode: "cors",
        cache: "default",
        body: JSON.stringify(params)
    };

    fetch(url, my_init)
        .then(function(res)
        {
            if(res.status === 201) {
                alert("Projet créé !");
                document.location.href = "myprojects.html";
            }else
                alert(res.statusText);
        }).catch(function(err){
            console.log(err.message);
    });
}
