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

const url = backUrl+'project/id';

const id = readCookie("id");

fetch(url + "?id=" + id)
    .then(function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                document.querySelector("#titre").innerHTML = datas[0]["Titre"];
                document.querySelector("#description").innerHTML = datas[0]["Description"];
            });
        } else
            alert(res.statusText);
    }).catch(function (err) {
    console.log(err.message);
});