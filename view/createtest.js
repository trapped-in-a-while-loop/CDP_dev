document.querySelector('#create').addEventListener('click', onClick);

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function onClick() {
    const url = backUrl+'test';

    const my_headers = new Headers();
    my_headers.append("Content-type", "application/json");

    const id = readCookie("id");
    const testGiven = document.getElementById('given').value;
    const testWhen = document.getElementById('when').value;
    const testThen = document.getElementById('then').value;

    var params = {id: id, testGiven: testGiven, testWhen: testWhen, testThen: testThen};

    var my_init = {
        method: 'POST',
        headers: my_headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(params)
    };

    fetch(url, my_init)
        .then(function(res)
        {
            if (res.status === 201) {
                alert("Test créé !");
                document.location.href = "test.html";
            }else
                alert(res.statusText);
        }).catch(function (err) {
            console.log(err.message);
        });
}