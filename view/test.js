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

const url = 'http://localhost:3000/test?id=';

const id = readCookie("id");

let cpt = 0;

fetch(url + id)
    .then(function (res) {
        if (res.status === 200) {
            res.json().then(function (datas) {
                datas.forEach(elem => {
                    var br1 = document.createElement("br");
                    var br2 = document.createElement("br");
                    var br3 = document.createElement("br");

                    var row = document.createElement("div");
                    row.setAttribute("class", "row");

                    var col8 = document.createElement("div");
                    col8.setAttribute("class", "col-sm-8");

                    var given = document.createElement("b");
                    given.innerHTML = "GIVEN : ";

                    var when = document.createElement("b");
                    when.innerHTML = "WHEN : ";

                    var then = document.createElement("b");
                    then.innerHTML = "THEN : ";

                    col8.append(given, elem["TestGiven"], br1, when, elem["TestWhen"], br2, then, elem["TestThen"]);

                    var col4 = document.createElement("div");
                    col4.setAttribute("class", "col-sm-4");

                    var del = document.createElement("a");
                    del.setAttribute("type", "button");
                    del.setAttribute("class", "btn btn-danger");
                    del.innerHTML = "Supprimer";

                    var edit = document.createElement("a");
                    edit.setAttribute("type", "button");
                    edit.setAttribute("class", "btn btn-primary");
                    edit.innerHTML = "Éditer";

                    col4.append(del, edit);

                    row.append(col8, col4);

                    document.querySelector("#tests").append(br3, row);
                });
            });
        } else
            alert(res.statusText);
    }).catch(function (err) {
    console.log(err.message);
});