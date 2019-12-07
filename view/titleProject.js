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

const urlTitre = backUrl+"project/id";

const idTitre = readCookie("id");

fetch(urlTitre + "?id=" + idTitre)
    .then(async function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                document.querySelector("#titre").innerHTML = datas[0]["Titre"];
            });
        } else
            await Swal.fire({
                icon: "error",
                text: res.statusText
            });
    }).catch(function (err) {
    console.log(err.message);
});