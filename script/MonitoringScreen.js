function randomNumber(min, max){

    return Math.floor(Math.random() * (max - min + 1) + min);

}

$(function(){
			$.ajax({
				 url: 'MonitoringScreen.html', // página da requisição externa
				 type: 'GET',

				 // parâmetro "html" vem com o conteúdo da página completo
				 success: function(html) {

					 var nomePaciente = $(html).find('h4');
					 $("#nomePaciente").html(nomePaciente); // Pega  o nome do paciente na pagina de pacientes

					 var dadosPaciente = $(html).find('h5'); // Pega o nome do paciente na pagina de pacientes
 					$("#dadosPaciente").html(dadosPaciente);

			 }
		 });
	 });
