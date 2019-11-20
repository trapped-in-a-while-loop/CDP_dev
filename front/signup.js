document.querySelector('#signup').addEventListener('click', onClick);

function onClick()
{
    //const url = "/back/user/create";

    const my_headers = new Headers();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const mail = document.getElementById('mail').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const societe = document.getElementById('societe').value;

    const my_init = {
        method: 'POST',
        headers: my_headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({'nom':nom, 'prenom':prenom, 'mail':mail, 'login':login, 'password':password, 'societe':societe})
    }

    fetch(url, my_init)
    .then(function(res)
    {
        alert("Signup done");
        document.location.href = "front/home.html";
    })
}