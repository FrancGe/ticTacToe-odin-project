const gameBoard = (function() {
    let tablero = ["", "", "", "", "", "", "", "", ""];

    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return {
        obtenerTablero: function() {
            return tablero;
        },

        colocarFicha: function(index, ficha) {
            if(tablero[index] === "") {
                tablero[index] = ficha;
                return true;
            }
            return false;
        },
        
        verificarGanador: function() {
           return combinacionesGanadoras.some((combo) => {
            const [a, b, c] = combo;

            return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
           });
        },

        reiniciarTablero: function() {
            tablero = ["", "", "", "", "", "", "", "", ""];
        }
    };
})();


const crearJugador = (nombre, marca) => {
    return {
        nombre: nombre, 
        marca: marca
    };
};

const jugador1 = crearJugador("juagador1", "X");
const jugador2 = crearJugador("juagador2", "O");

const gameController = (function() {
    const jugadores = [jugador1, jugador2];
    const casillas = document.querySelectorAll(".casilla");
    const btnReiniciar = document.querySelector(".reiniciar-tablero");
    let indiceJugador = 0;
    let juegoTerminado = false;

    function reiniciarJuego() {
        indiceJugador = 0;
        juegoTerminado = false;

        gameBoard.reiniciarTablero();

        casillas.forEach(casilla => {
            casilla.textContent = "";
        })
    }

    function click(e) {
        if(juegoTerminado) return;
        const index = parseInt(e.target.dataset.index);
        console.log("Clikc en: ", index);
        const jugadorActual = jugadores[indiceJugador];
        const pudoColocar = gameBoard.colocarFicha(index, jugadorActual.marca);

        if(pudoColocar) {
            e.target.textContent = jugadorActual.marca;
            const ganador = gameBoard.verificarGanador();
            const tableroLleno = !gameBoard.obtenerTablero().includes("");
            let estadoJuego = document.querySelector(".estado-juego");
            if(ganador) {
                estadoJuego.textContent = `El ganador es: ${jugadorActual.nombre}`;
                juegoTerminado = true;
            } else if(tableroLleno) {
                estadoJuego.textContent = "EMPATE!!";
                juegoTerminado = true;
            } else {
                indiceJugador = indiceJugador === 0 ? 1 : 0;
            }
        }
    }

    function iniciar() {
        casillas.forEach(casilla => {
            casilla.addEventListener("click", click);
        });

        btnReiniciar.addEventListener("click", reiniciarJuego);
    }

    return {
        iniciar: iniciar
    };
})();

gameController.iniciar();
