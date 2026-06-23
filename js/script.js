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
