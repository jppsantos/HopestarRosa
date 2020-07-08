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

        var divNames = document.createElement('DIV')
        divNames.className = 'col-sm-12'

        var nameView = document.createElement('H5')
        nameView.innerHTML += patient.name
        
        divNames.appendChild(nameView)

        var pressureView = document.createElement('H6')
        pressureView.className = 'card-text'
        pressureView.innerHTML += `Pressão - ${patient.defaultPressure.systolic}/${patient.defaultPressure.diastolic}`
        divNames.appendChild(pressureView)

        var tempView = document.createElement('H6')
        tempView.className = 'card-text'
        tempView.innerHTML += `Temp - ${patient.defaultTemp.value} &degC`
        divNames.appendChild(tempView)

        card.appendChild(divNames)

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

        // card.appendChild(document.createElement('BR'))

        document.getElementById('patient-list').appendChild(card)
    }
}