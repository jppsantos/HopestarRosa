/**
 * verify if login and password matches, if matches, send to patients page, if not, send a alert
 */
function verifyLogin(){
    /// user email
    let usuario = document.getElementById('txtEmail').value;
    /// user password
    let senha = document.getElementById('senha').value;

    if (usuario.localeCompare('resp@hopstar.com.br') == 0 && senha.localeCompare('12345') == 0){
        window.location.href = "../html/PatientsList.htm";
    } else {
        alert('Usuario ou senha incorreto!');
    }
}