function randomNumber(min, max){

    return Math.floor(Math.random() * (max - min + 1) + min);

}

function monitoring(){
    // carrega os dados do paciente no card de paciente
    mostraDadosPaciente();

    var array = [];
    var stop = setInterval( function() { gerarDados(array); },1000);

    function gerarDados(array) {
        var sis = parseInt(document.getElementById('sistolica').innerHTML);
        var dis = parseInt(document.getElementById('diastolica').innerHTML);
        var temp = parseInt(document.getElementById('temperatura').innerHTML);

        var radomSis = randomNumber(sis-10,sis+2);
        var radomDis = randomNumber(dis-10,dis+2);
        var radomTemp = randomNumber(temp-10,temp+2);

        document.getElementById('pressaoSistolica').value = radomSis + " mmHg";
        document.getElementById('pressaoDiastolica').value = radomDis + " mmHg";
        document.getElementById('temperaturaCard').value = radomTemp + "°C";

        if(radomSis > sis || radomDis > dis || radomTemp > temp) {
          localStorage.setItem('arrayDeValoresDoPaciente', JSON.stringify(array));
          alert("WARNING!!");
          document.getElementById("historicButton").className  = "visible";
          clearInterval(stop);
        }

        var date = new Date();

        var dados = {sistolica: sis , diastolica: dis, temperatura: temp, data: date}; // Cria um array com "members"

        array.unshift(dados); //Adiciona no inicio do array

        if(array.length == 5) {
          array.pop(); //Remove o utlimo elemento
        }

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
