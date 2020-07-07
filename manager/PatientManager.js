//CARREGANDO DADOS DO PACIENTES DE ACORDO COM O RESPONSÁVEL
function loadPatient(respID) {

    const url = `https://vapor-projeto-hopstar.herokuapp.com/api/resp/B4C0235B-DBAC-4227-A1DD-8E6BBFFC02C9/patient`

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

        var nameView = document.createElement('H5')
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
        card.appendChild(monitorBtn)

        // card.appendChild(document.createElement('BR'))

        document.getElementById('patient-list').appendChild(card)
    }
}