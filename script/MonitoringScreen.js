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
        }, 1000);
    });
}

function monitoring(){
    var array = [];
    var stop = setInterval( function() { gerarDados(array); },4000);

    function gerarDados(array) {
        var sis = randomNumber(120-10,120+1);
        var dis = randomNumber(80-10,80+1);
        var temp = randomNumber(33-10,33+1);

        document.getElementById('pressaoSistolica').innerHTML = sis;
        document.getElementById('pressaoDiastolica').innerHTML = dis;
        document.getElementById('temperaturaCard').innerHTML = temp;

        if(sis > 120 || dis > 80 || temp > 33) {
          alert("WARNING!!");
          document.getElementById("historicButton").className  = "visible";
          clearInterval(stop);
        }

        var date = new Date();

        var dados = {sistolica: sis , diastolica: dis, temperatura: temp, data: date}; // Cria um array com "members"

        array.unshift(dados); //Adiciona no inicio do array

        if(array.length == 5) {
          array.pop(); //Remove o utlimo elemento
        }

        //Validar Tempertura e pressoes
        //Alerta Com o pop-up
        //Liberar historicButton
        // Ver uma forma de enviar esse array para o historico

      }
}
