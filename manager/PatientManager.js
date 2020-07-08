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

    var container = document.createElement('DIV')
    container.className = 'container col-sm-10'

    var view = document.createElement('DIV')
    view.id = "patient-list"
    view.className = 'row'

    container.appendChild(view)

    var addPatientCard = document.createElement('DIV')
    addPatientCard.className = "card add-patient fixedHeight"

    var destination = document.createElement('A')
    destination.href = "AddPatientScreen.htm"
    destination.className = "add-patient centralizar"

    var icon = document.createElement('I')
    icon.className = "fas fa-plus-circle"
    destination.appendChild(icon)

    var column = document.createElement('DIV')
    column.className = 'col-sm-3'

    addPatientCard.appendChild(destination)
    column.appendChild(addPatientCard)

    view.appendChild(column)

    for (var index in patients) {

        const patient = patients[index]

        var card = document.createElement('DIV')
        card.className = 'card patient fixedHeight text-center text-white mb-3'

        var divIcon = document.createElement('DIV')
        divIcon.className = 'user-icon'

        var icon = document.createElement('I')
        icon.className = 'fas fa-user'

        divIcon.appendChild(icon)
        card.appendChild(divIcon)

        var divNames = document.createElement('DIV')
        divNames.className = 'card-body'

        var nameView = document.createElement('H5')
        nameView.className = "card-text name"
        nameView.innerHTML += patient.name

        card.appendChild(nameView)
        var name = patient.name

        if (name.length > 22) {
            name = name.substring(0,22);
            nameView.innerHTML = name + "...";
        } else {
            nameView.innerHTML += name
            if (name.length < 18) {
                divNames.appendChild(document.createElement('BR'))
            }
            
        }        
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

        divNames.appendChild(monitorBtn)

        var column = document.createElement('DIV')
        column.className = 'col-sm-3'
        
        column.appendChild(card)

        view.appendChild(column)
    }

    document.body.appendChild(container)
}

function filterPatient() {

    var searchName = document.getElementById('search-name').value.toLowerCase();
    var patients = document.getElementById('patient-list').getElementsByClassName('patient')

    for(var i=0; i<patients.length; i++) {
        var patient = patients[i]
        var name = patient.getElementsByClassName('card-body')[0].getElementsByClassName('name')[0].textContent

        if (name.toLowerCase().indexOf(searchName) > -1) {
            patients[i].style.display = ""
        } else {
            patients[i].style.display = "none"
        }
    }
}




// quick search regex
var qsRegex;
var buttonFilter;

// init Isotope
var $grid = $('.container').isotope({
  itemSelector: '.card',
  layoutMode: 'fitRows',
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});

$('#filters').on( 'click', 'button', function() {
  buttonFilter = $( this ).attr('data-filter');
  $grid.isotope();
});

// use value of search field to filter
var $quicksearch = $('#quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
}) );


  // change is-checked class on buttons
$('.btn-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});
  

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
}



