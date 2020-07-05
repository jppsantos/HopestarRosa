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

function mostraDadosPaciente(){

  var nome = document.getElementById('nomePaciente');
  var sexo = document.getElementById('sexo');
  var endereco = document.getElementById('endereco');
  var idade = document.getElementById('idade');
  var temperatura = document.getElementById('temperatura');
  var diastolica = document.getElementById('diastolica');
  var sistolica = document.getElementById('sistolcia');

  setArray();
  pressoes();
}

function setArray(){
  array = JSON.parse(localStorage.getItem('arrayDeValoresDoPaciente'));
}
