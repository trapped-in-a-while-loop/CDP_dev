document.querySelector("#create").addEventListener("click", onClick);

function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function onClick()
{
    const url = backUrl+"task";

    const my_headers = new Headers();
    my_headers.append("Content-type", "application/json");

    const id = readCookie("id");
    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const statut = document.getElementById("statut").value;

    const params = {id: id, titre: titre, description: description, statut: statut};

    const my_init = {
        method: "POST",
        headers: my_headers,
        mode: "cors",
        cache: "default",
        body: JSON.stringify(params)
    };

    fetch(url, my_init)
        .then(async function(res)
        {
            if (res.status === 201) {
                await Swal.fire({
                    icon: "success",
                    text: "Tâche créée !"
                });
                document.location.href = "task.html";
            }else
                await Swal.fire({
                    icon: "error",
                    text: res.statusText
                });
        }).catch(function (err) {
            console.log(err.message);
        });
}