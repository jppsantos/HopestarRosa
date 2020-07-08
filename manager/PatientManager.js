//CARREGANDO DADOS DO PACIENTES DE ACORDO COM O RESPONSÁVEL
function loadPatient() {

    const respID = sessionStorage.idManager;
    const url = `https://vapor-projeto-hopstar.herokuapp.com/api/resp/`+ respID +`/patient`;

    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            createPatientList(json)
        })
        .catch(error => {
            console.log(error)
        })
}


//CRIANDO LISTA DE PACIENTES DO RESPONSÁVEL
function createPatientList(patients) {

    var view = document.createElement('DIV')
    view.id = "patient-list"
    view.className = 'container-fluid card-columns'

    var addPatientCard = document.createElement('DIV')
    addPatientCard.className = "card add-patient fixedHeight"

    var destination = document.createElement('A')
    destination.href = "AddPatientScreen.htm"
    destination.className = "add-patient centralizar"

    var icon = document.createElement('I')
    icon.className = "fas fa-plus-circle"
    destination.appendChild(icon)

    addPatientCard.appendChild(destination)

    view.appendChild(addPatientCard)

    for (var index in patients) {

        const patient = patients[index]

        var card = document.createElement('DIV')
        card.className = 'card fixedHeight text-center text-white'

        var divIcon = document.createElement('DIV')
        divIcon.className = 'user-icon'

        var icon = document.createElement('I')
        icon.className = 'fas fa-user'

        divIcon.appendChild(icon)
        card.appendChild(divIcon)

        var nameView = document.createElement('H5')
        nameView.className = "card-text"
        nameView.innerHTML += patient.name
        card.appendChild(nameView)

        var pressureView = document.createElement('H6')
        pressureView.className = 'card-text'
        pressureView.innerHTML += `Pressão - ${patient.defaultPressure.systolic}/${patient.defaultPressure.diastolic}`
        card.appendChild(pressureView)

        var tempView = document.createElement('H6')
        tempView.className = 'card-text'
        tempView.innerHTML += `Temp - ${patient.defaultTemp.value} &degC`
        card.appendChild(tempView)

        card.appendChild(document.createElement('BR'))

        var monitorBtn = document.createElement('A')
        monitorBtn.className = 'btn btn-primary col-sm-10'
        monitorBtn.href = "MonitoringScreen.htm"
        monitorBtn.innerText = 'Monitorar'

        monitorBtn.addEventListener("click", function () {
            sessionStorage.setItem('patient', JSON.stringify(patient));
            window.parent.location = "../html/MonitoringScreen.htm";
        })
        card.appendChild(monitorBtn)
        view.appendChild(card)
    }

    document.body.appendChild(view)
}

$(document).ready(function(){
    $("#search-name").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
