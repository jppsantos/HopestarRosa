var array;

function pressoes(){
  var lista = document.getElementById('lista');
  while (lista.firstChild) {
    lista.removeChild(lista.lastChild);
  }

  array.forEach(a => {
    var h5 = document.createElement('h5');
    var date = new Date();
    var dateF = ("0" + date.getDate()).substr(-2) + "/" 
    + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
    h5.innerHTML = dateF + ' - ' + a.diastolica + 'mmHg - ' + a.sistolica + "mmHg";
    lista.appendChild(h5);
  });
}

function temperaturas(){
  var lista = document.getElementById('lista');
  while (lista.firstChild) {
    lista.removeChild(lista.lastChild);
  }

  array.forEach(a => {
    var date = new Date();
    var dateF = ("0" + date.getDate()).substr(-2) + "/" 
    + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
    var h5 = document.createElement('h5');
    h5.innerHTML = dateF + ' - ' + a.temperatura + "°C";
    lista.appendChild(h5);
  });
  
}

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
