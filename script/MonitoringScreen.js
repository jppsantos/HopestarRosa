function randomNumber(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);

}

function monitoring() {
  var array = [];
  var cont = 0; 
  mostraDadosPaciente()
  var stop = setInterval(function () { gerarDados(array); }, 1000);

  function gerarDados(array) {
    var sis = parseInt(document.getElementById('sistolica').innerHTML);
    var dis = parseInt(document.getElementById('diastolica').innerHTML);
    var temp = parseInt(document.getElementById('temperatura').innerHTML);

    if(cont<5){
      var radomSis = randomNumber(sis - 10, sis) ;
      var radomDis = randomNumber(dis - 10, dis);
      var radomTemp = randomNumber(temp - 10, temp);
      cont ++;
    }else{
      var radomSis = randomNumber(sis - 10, sis + 2);
      var radomDis = randomNumber(dis - 10, dis + 2);
      var radomTemp = randomNumber(temp - 10, temp + 2);
    }

    document.getElementById('pressaoSistolica').value = radomSis + " mmHg";
    document.getElementById('pressaoDiastolica').value = radomDis + " mmHg";
    document.getElementById('temperaturaCard').value = radomTemp + "°C";

    var jsonPatient = JSON.parse(sessionStorage.patient);

    if (radomSis > sis || radomDis > dis || radomTemp > temp) {
      var msg = radomTemp > temp ? "Temperatura" : "Pressao";
      var name = jsonPatient.name
      name = name.substring(0,20);

      alert("🚨 ATENÇÃO! 🚨 " + msg + " fora da normalidade. Dirija-se ao terminal de " + name + "...");
      //beep
      document.getElementById("historicButton").className = "visible";
      clearInterval(stop);
    }

    const pressure = {
      diastolic: radomSis,
      systolic: radomDis,
      patient: {
        id: jsonPatient.id
      }
    }

    const temperature = {
      value: radomTemp,
      patient: {
        id: jsonPatient.id
      }
    }

    var dados = {
      sistolica: radomSis , 
      diastolica: radomDis, 
      temperatura: radomTemp, 
    }; // Cria um array com "members"

    const parametersP = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pressure),
      method: "POST"
    };

    fetch("https://vapor-projeto-hopstar.herokuapp.com/api/pressure", parametersP)
      .then(r => r.json().then(json => ({ status: r.status, body: json })))
      .then(json => {
        if (json.status != 200) {
          console.log("Erro no cadastro, Tente novamente!");
        } 
      })
      .catch(error => {
        console.log("deu ruim pressao" + error)
      });


    const parametersT = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(temperature),
      method: "POST"
    };

    fetch("https://vapor-projeto-hopstar.herokuapp.com/api/temperature", parametersT)
      .then(r => r.json().then(json => ({ status: r.status, body: json })))
      .then(json => {
        if (json.status != 200) {
          console.log("Erro no cadastro, Tente novamente!");
        } 
      })
      .catch(error => {
        console.log("deu ruim temperatura" + error)
      });

    array.unshift(dados); //Adiciona no inicio do array
    localStorage.setItem('arrayDeValoresDoPaciente', JSON.stringify(array));
  }
}

/*
 Carrega os dados do paciente no card de paciente
*/
function mostraDadosPaciente(){

  var jsonPatient = JSON.parse(sessionStorage.patient);
  
  document.getElementById('nomePaciente').innerHTML = jsonPatient.name;
  document.getElementById('sexo').innerHTML = jsonPatient.genre;
  document.getElementById('endereco').innerHTML = jsonPatient.address;
  document.getElementById('idade').innerHTML = jsonPatient.age;
  document.getElementById('temperatura').innerHTML = jsonPatient.defaultTemp.value;
  document.getElementById('diastolica').innerHTML = jsonPatient.defaultPressure.diastolic;
  document.getElementById('sistolica').innerHTML = jsonPatient.defaultPressure.systolic;

}
