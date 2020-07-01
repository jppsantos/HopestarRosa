function randomNumber(min, max){

    return Math.floor(Math.random() * (max - min + 1) + min);

}

function validate(min, max, defaultValue, value){

    value = randomNumber(min, max);
    if(value > defaultValue+2 || value < defaultValue-2)
        return false;
    else
        return true;

}
function refreshData(){
    document.getElementById("pressaoSistolica").innerHTML = 0;
    $(document).ready(function(){
        setInterval(function(){
            var validationPressaoSis = validate(document.getElementById("PressãoPadraoSistolica").value-3, 
                document.getElementById("PressãoPadraoSistolica").value+3,
                document.getElementById("PressãoPadraoSistolica").value,
                document.getElementById("pressaoSistolica").value);
            var validationPressaoDia = validate(document.getElementById("PressãoPadraoDiastolica").innerHTML-3, 
                document.getElementById("PressãoPadraoDiastolica").innerHTML+3,
                document.getElementById("PressãoPadraoDiastolica").innerHTML,
                document.getElementById("pressaoDiastolica").innerHTML);
            var validationTemp = validate(document.getElementById("TemperaturaPadrao").innerHTML-3, 
                document.getElementById("TemperaturaPadrao").innerHTML+3,
                document.getElementById("TemperaturaPadrao").innerHTML,
                document.getElementById("Temperatura").innerHTML)+"°C";
            $("#pressaoSistolica").load(window.location.href + "#pressaoSistolica");
            $("#pressaoDiastolica").load(window.location.href + "#pressaoDiastolica");
            $("#Temperatura").load(window.location.href + "#Temperatura");
            if(!validationPressaoSis || !validationPressaoDia || !validationTemp){
                //Chama pop-up 
            }
        }, 3000);
    });
}

