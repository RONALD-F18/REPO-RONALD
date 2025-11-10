let primerNumero  = NaN; 
let segundoNumero = NaN;
let operadorActual = "";


function  cambiarOperadorActual(operador, resultado, temporal) {

    if(temporal.textContent.trim() !== ""){

        try{

            if(isNaN(primerNumero)){

                primerNumero = parseFloat(temporal.textContent.trim());

            } else if (operadorActual.trim() !== "")  {
                
                calcular(resultado, temporal);
                
            }

            operadorActual = operador.textContent.trim();
            resultado.textContent = primerNumero.toString() + operadorActual;
            temporal.textContent = "";

        } catch {

            resultado.textContent = "ERROR";
            temporal.textContent = "ERROR";

        }

    }

}

function calcular (resultado, temporal) {

    try{

        let auxiliarTemporal = temporal.textContent.trim();

        if(auxiliarTemporal === ""){
            return;
        }

        segundoNumero = parseFloat(auxiliarTemporal);

        if (operadorActual !== "" && !isNaN(primerNumero)) {

            switch (operadorActual) {

                case "+":

                    primerNumero += segundoNumero;
                    break;

                case "-":

                    primerNumero -= segundoNumero;
                    break;

                case "*":

                    primerNumero *= segundoNumero;
                    break;

                case "/":

                    if (segundoNumero != 0) {

                        primerNumero /= segundoNumero;

                    } else {

                        resultado.textContent = "Division por 0";
                        temporal.textContent = "Division por 0";
                        return;

                    }


                    break;


                default:

                    break;

            }

        } else {

            primerNumero = segundoNumero;

        }

     } catch {

        resultado.textContent = "ERROR";
        temporal.textContent = "ERROR";

    }


}

function seleccionarNumero(elemento, resultado, temporal){

    const valor = elemento.value;
    
    if (resultado.textContent === "0" && valor === ".") {

        temporal.textContent = "0."; 

    } else if (resultado.textContent === "0") {

        temporal.textContent = valor; 

    } else {

        temporal.textContent += valor;

    }
}

function igual (resultado, temporal){

    calcular(resultado, temporal)
    resultado.textContent = primerNumero;
    temporal.textContent = "";

}

function borrando (resultado, temporal) {

    const valorTemporal = temporal.textContent.trim();

    if (valorTemporal.length > 1) {

        let nuevoTexto = valorTemporal.substring(0, (valorTemporal.length) - 1);

        temporal.textContent = nuevoTexto;

    } else {

        temporal.innerHTML = "";
        resultado.innerHTML = "";

        primerNumero  = NaN; 
        segundoNumero = NaN;

    }

}

function  borrarTodo(resultado, temporal) {

    temporal.innerHTML = "";
    resultado.innerHTML = "";

    primerNumero  = NaN; 
    segundoNumero = NaN;

}

document.addEventListener("DOMContentLoaded", () => {

    //Seleccionar numeros
    const botones = document.querySelectorAll(".seleccionar__numero");
    const resultado = document.getElementById("result");
    const temporal = document.getElementById("operation");

    botones.forEach(elemento => {
        elemento.addEventListener("click", () => seleccionarNumero(elemento, resultado, temporal));
    });


    //Borrar elemento por elemento

    const borrar = document.getElementById("borrarParcial")

    borrar.addEventListener("click", () => borrando(resultado, temporal));


    //Borrar todo

    const borrarTotal = document.getElementById("borrarTotal");

    borrarTotal.addEventListener("click", () => borrarTodo(resultado, temporal));


    //Cambiar Operador Actual
    const botonesOperadores  = document.querySelectorAll(".cambiarOperador");

    botonesOperadores .forEach(operador => {
        operador.addEventListener("click", () => cambiarOperadorActual(operador, resultado, temporal));
    });

    //Calcular
    const botonIgual = document.getElementById("igual");

    botonIgual.addEventListener("click", () => igual(resultado, temporal));
});