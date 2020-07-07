///Url base da API
var urlRoot = "https://vapor-projeto-hopstar.herokuapp.com";

/*
Cadastrar Responsavel
*/
function addManager() {

  //Obtem os valores dos campos
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const data = {
    name: name,
    email: email,
    password: password
  };

  const parameters = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    method: "POST"
  };

  fetch(urlRoot + "/api/resp", parameters)
    .then (r => r.json().then(json => ({status: r.status, body: json})))
    .then(json => {
      if(json.status == 200){
        alert("Cadastro realizado com sucesso!");
        window.parent.location = "../html/index.htm";
      }else{
        alert("Erro no cadastro, Tente novamente!");
      }
    })
    .catch(error => {
      console.log("deu ruim " + error)
    });
}
