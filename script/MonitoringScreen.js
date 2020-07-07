function randomNumber(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);

}

function monitoring() {
  var array = [];
  var stop = setInterval(function () { gerarDados(array); }, 1000);

  function gerarDados(array) {
    var sis = parseInt(document.getElementById('sistolica').innerHTML);
    var dis = parseInt(document.getElementById('diastolica').innerHTML);
    var temp = parseInt(document.getElementById('temperatura').innerHTML);

    var radomSis = randomNumber(sis - 10, sis + 2);
    var radomDis = randomNumber(dis - 10, dis + 2);
    var radomTemp = randomNumber(temp - 10, temp + 2);

    document.getElementById('pressaoSistolica').value = radomSis + " mmHg";
    document.getElementById('pressaoDiastolica').value = radomDis + " mmHg";
    document.getElementById('temperaturaCard').value = radomTemp + "°C";

    if (radomSis > sis || radomDis > dis || radomTemp > temp) {
      alert("WARNING!!");
      //beep
      document.getElementById("historicButton").className = "visible";
      clearInterval(stop);
    }

    var date = new Date();

    const pressure = {
      diastolic: 1,
      systolic: 1,
      patient: {
        id: "7CC16353-52CF-4194-A1F1-057B0EC4CB91"
      }
    }

    const temperature = {
      value: 1,
      patient: {
        id: "7CC16353-52CF-4194-A1F1-057B0EC4CB91"
      }
    }

    // var dados = {sistolica: sis , 
    //   diastolica: dis, 
    //   temperatura: temp, 
    //   data: date}; // Cria um array com "members"

    const parametersP = {
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify(pressure),
      method: "POST"
    };

    fetch("https://vapor-projeto-hopstar.herokuapp.com/api/pressure", parametersP)
      .then(resp => resp)
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        console.log("deu ruim pressao" + error)
      });


    const parametersT = {
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify(temperature),
      method: "POST"
    };

    fetch("https://vapor-projeto-hopstar.herokuapp.com/api/temperature", parametersT)
      .then(resp => resp)
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        console.log("deu ruim temperatura" + error)
      });

    // array.unshift(dados); //Adiciona no inicio do array

    // if(array.length == 5) {
    //   array.pop(); //Remove o utlimo elemento
    // }

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
