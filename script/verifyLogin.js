function verifyLogin(){
    let usuario = document.getElementById('txtEmail').value;
    let senha = document.getElementById('senha').value;

    if (usuario.localeCompare('resp@hopstar.com.br') == 0 && senha.localeCompare('12345') == 0){
        alert('yay');
    } else {
        alert('nay');
    }
}