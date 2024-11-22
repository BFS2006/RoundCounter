function tempoRound() {
    // Obter os valores dos inputs
    var tempoRoundMin = parseFloat(document.getElementById("inputTRound").value);
    var tempoIntervaloMin = parseFloat(document.getElementById("inputTIntervalo").value);
    var quantidadeRounds = parseInt(document.getElementById("inputTQuantRounds").value);

    // Verificação se os valores são válidos
    if (isNaN(tempoRoundMin) || isNaN(tempoIntervaloMin) || isNaN(quantidadeRounds) || tempoRoundMin <= 0 || tempoIntervaloMin < 0 || quantidadeRounds <= 0) {
        alert("Por favor, insira valores válidos!");
        return;
    }

    // Converter minutos para segundos
    var tempoRoundSegundos = tempoRoundMin * 60;
    var tempoIntervaloSegundos = tempoIntervaloMin * 60;

    var roundCount = 0;  // Contador de rounds
    var tempoElement = document.getElementById("tempo");

    // Função para exibir o tempo de forma formatada
    function formatarTempo(tempoSegundos) {
        var minutos = Math.floor(tempoSegundos / 60);
        var segundos = tempoSegundos % 60;
        return minutos + "m " + segundos + "s";
    }

    // Função para iniciar a contagem regressiva do round
    function contarRound() {
        var tempoRestante = tempoRoundSegundos;
        var intervalo = setInterval(function() {
            // Atualiza a exibição do tempo na tela
            tempoElement.textContent = "Round " + (roundCount + 1) + " - " + formatarTempo(tempoRestante);

            // Se o tempo de round terminar
            if (tempoRestante <= 0) {
                clearInterval(intervalo); // Limpar o intervalo
                roundCount++;

                // Exibir mensagem de conclusão do round
                tempoElement.textContent = "Round " + roundCount + " finalizado!";

                // Se ainda houver rounds restantes
                if (roundCount < quantidadeRounds) {
                    // Espera o intervalo de descanso
                    setTimeout(function() {
                        tempoElement.textContent = "Intervalo: " + tempoIntervaloMin + " minutos.";
                        contarIntervalo();
                    }, 1000);
                } else {
                    tempoElement.textContent = "Todos os rounds foram concluídos!";
                }
                return;
            }

            // Decrementa o tempo restante
            tempoRestante--;
        }, 1000); // Atualiza a cada 1 segundo
    }

    // Função para contar o intervalo de descanso
    function contarIntervalo() {
        var tempoRestanteIntervalo = tempoIntervaloSegundos;
        var intervalo = setInterval(function() {
            // Atualiza a exibição do intervalo
            tempoElement.textContent = "Intervalo: " + formatarTempo(tempoRestanteIntervalo);

            // Se o tempo de intervalo terminar
            if (tempoRestanteIntervalo <= 0) {
                clearInterval(intervalo); // Limpar o intervalo
                tempoElement.textContent = "Iniciando próximo round...";

                // Iniciar o próximo round
                setTimeout(contarRound, 1000);
                return;
            }

            // Decrementa o tempo restante do intervalo
            tempoRestanteIntervalo--;
        }, 1000); // Atualiza a cada 1 segundo
    }

    // Iniciar o primeiro round
    contarRound();
}

// Aqui associamos o evento de clique ao botão no JavaScript
document.getElementById("startButton").addEventListener("click", tempoRound);
