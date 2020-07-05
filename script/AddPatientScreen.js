function sendPatient(){
    var name = document.forms["myForm"]["name"].value;
    var sex = document.forms["myForm"]["sex"].value;
    var address = document.forms["myForm"]["address"].value;
    var age = parseInt(document.forms["myForm"]["age"].value);
    var systolicPressure = parseInt(document.forms["myForm"]["systolicPressure"].value);
    var diastolicPressure = parseInt(document.forms["myForm"]["diastolicPressure"].value);
    var temperature = parseInt(document.forms["myForm"]["temperature"].value);

    // add patient to api
    // return false // se nao conseguir salvar

    window.location.href = "../html/PatientsList.htm";

    return true;
}