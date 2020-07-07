var urlRoot = "https://vapor-projeto-hopstar.herokuapp.com";
// var urlRoot = "http://7217db517585.ngrok.io";


function sendPatien(){
    var name = document.forms["myForm"]["name"].value;
    var sex = document.forms["myForm"]["sex"].value;
    var address = document.forms["myForm"]["address"].value;
    var age = parseInt(document.forms["myForm"]["age"].value);
    var systolicPressure = parseInt(document.forms["myForm"]["systolicPressure"].value);
    var diastolicPressure = parseInt(document.forms["myForm"]["diastolicPressure"].value);
    var temperature = parseInt(document.forms["myForm"]["temperature"].value);
    // add patient to api
    // return false // se nao conseguir salvar

    window.location.href = "../html/PatientsList.htm";

    return true;
}


/*
Envia pacente para a API
*/
function sendPatie () {
    var ajax = new XMLHttpRequest();
    // Seta tipo de requisição e URL com os parâmetros
    ajax.open("POST", urlRoot + "/api/patient", true);
    ajax.setRequestHeader("Content-Type", "application/json");

    var idManager = sessionStorage.getItem('idManager');
    var name = document.getElementById("name").value;
    var genre = document.getElementById("genre").value;
    var address = document.getElementById("address").value;
    var age = parseInt(document.getElementById("age").value);
    var systolicPressure = parseInt(document.getElementById("systolicPressure").value);
    var diastolicPressure = parseInt(document.getElementById("diastolicPressure").value);
    var temperature = parseInt(document.getElementById("temperature").value);

    // var text = '{"name":"' + name +
    //   '","genre":"' + genre +
    //   '","age":' + age +
    //   ',"temperature":' + temperature +
    //   ',"systolic":' + systolicPressure +
    //   ',"diastolic":' + diastolicPressure +
    //   ',"address":"' + address +
    //   '","responsible": { "id": "' + idManager +
    //   '"}}';

      var text = '{"name":"' + name +
      '","genre":"' + genre +
      '","age":' + age +
      ',"address":"' + address +
      '","responsible": { "id": "' + idManager +
      '"}}';

    // Envia a requisição
    ajax.send(text);
    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = function () {
      // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
      if (this.readyState == 4 && this.status == 200) {
          alert("Paciente adicionado com sucesso 😉!");
          parent.location = "PatientList.htm";
      } 
    }
}

/*
Envia pacente para a API
*/
function sendPatient () {
    var url = urlRoot + "/api/patient";

    var idManager = sessionStorage.getItem('idManager');
    // var idManager = "B4C0235B-DBAC-4227-A1DD-8E6BBFFC02C9";
    var username = document.getElementById("name").value;
    var genrePatient = document.getElementById("genre").value;
    var addressPatient = document.getElementById("address").value;
    var agePatient = parseInt(document.getElementById("age").value);
    var systolicPressure = parseFloat(document.getElementById("systolicPressure").value);
    var diastolicPressure = parseFloat(document.getElementById("diastolicPressure").value);
    var temperature = parseFloat(document.getElementById("temperature").value);

     alert(idManager + username + genrePatient + addressPatient + agePatient + systolicPressure + diastolicPressure + temperature);

    const jsonData = {
        age : agePatient,
        address : addressPatient,
        genre : genrePatient,
        name : username,
        responsible : idManager,
        defaultTemp : {
            value : temperature
        },
        defaultPressure : {
            diastolic: diastolicPressure,
            systolic: systolicPressure
        }
    };


    const parameters = {
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(jsonData),
        method: "POST"
    };

    fetch(url,parameters)
    .then(resp => {resp.json()})
    .then(json => {
        alert("Paciente cadastrado com sucesso! 😍");
        window.parent.location = "../html/PatientsList.htm";
    })
    .catch (error => {
        alert(error);
    })
}