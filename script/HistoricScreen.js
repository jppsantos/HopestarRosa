var array;

function mostraPressoes() {
  var lista = document.getElementById('lista');
  while (lista.firstChild) {
    lista.removeChild(lista.lastChild);
  }

  var h5 = document.createElement('h5');
  h5.innerHTML = '20/07 - 19:45 - 37°C';

  lista.appendChild(h5);
}

function pressoes(){
  var lista = document.getElementById('lista');
  var h;
  for (let index = 0; index < array.diastolica.length; index++) { 
    h = document.createElement('h');
    h.innerHTML = array.data[index] + ' - ' + array.diastolica[index] + ' - ' + array.sistolica[index];
    lista.appendChild(h);
  }
}

function temperaturas(){
  var lista = document.getElementById('lista');
  var h;
  for (let index = 0; index < array.temperatura.length; index++) { 
    h = document.createElement('h');
    h.innerHTML = array.data[index]+' - ' + array.temperatura[index];
    lista.appendChild(h);
  }
}

function mostraTemperaturas(){
  var lista = document.getElementById('lista');
  while (lista.firstChild) {
    lista.removeChild(lista.lastChild);
  }

  var h5 = document.createElement('h5');
  h5.innerHTML = '20/07 - 19:45 - 130 mmHg e 80 mmHg';

  lista.appendChild(h5);
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

  setArray();
  pressoes();
}

function setArray(){
  array = JSON.parse(localStorage.getItem('arrayDeValoresDoPaciente'));
}
