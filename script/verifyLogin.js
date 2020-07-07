/**
 * verify if login and password matches, if matches, send to patients page, if not, send a alert
 */
function verifyLogi(){
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

/**
 * verify if login and password matches, if matches, send to patients page, if not, send a alert
 */
function verifyLogin(){
    // base url
    const url = "https://vapor-projeto-hopstar.herokuapp.com/api/login";
    /// user email
    let email = document.getElementById('email').value;
    /// user password
    let password = document.getElementById('password').value;

    // var auth = "Basic " + btoa(user + ":" + password);
    // `Basic ${btoa(`${user}:${password}`)}`

    const parameters = {
        headers: {
            "Authorization" : `Basic ${btoa(`${email}:${password}`)}`
        },
        method: "POST"
    };

    fetch(url,parameters)
    // .then(resp => resp)
    .then (r => r.json().then(data => ({status: r.status, body: data})))
    .then(data => {
         if (data.status == 200) {
            // var json = await response.json();
            sessionStorage.setItem("idManager", data.body.id);
            window.location.href = "../html/PatientsList.htm";
        }
    })
    .catch (error => {
        alert("Login inválido, Tente novamente 😉")
    })
}