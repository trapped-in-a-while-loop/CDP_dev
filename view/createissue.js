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
  const url = backUrl+"issue";

  const my_headers = new Headers();
  my_headers.append("Content-Type", "application/json");

  const id = readCookie("id");
  const role = document.querySelector("#role").value;
  const action = document.querySelector("#action").value;
  const raison = document.querySelector("#raison").value;

  const params = {id: id, role: role, action: action, raison: raison};

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
      if (res.status === 201) {
        alert("Issue créée !");
        document.location.href = "issue.html";
      }else 
        alert(res.statusText);
    }).catch(function (err) {
      console.log(err.message);
    });
}