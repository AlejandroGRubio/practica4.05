"use strict";


var doc = window.document;


let contPendientes;
let contAcabadas;

let contadorPendientes = 0;
let contadorAcabadas = -1;

let contadorBorrarAcabar = 0;
let contadorVolverArchivar = -1;


//Añade a la etiqueta de esa clase el atributo onClick con el nombre de función y valor.
function addOnClickPorClase(clase, datosOnClick, valorFunc = ``) {
    
    var cont = doc.getElementsByClassName(clase);


    for (let i = 0; i < cont.length; i++) {
        cont[i].setAttribute(`onClick`, `${datosOnClick}(${valorFunc})`);
        
    }



}






//Cambia el contenido de una variable, indicando el texto antiguo y el nuevo a remplazar.
function cambiarContenido(varTexto, textoAnti, textoNuevo) {
    
    var devolverT;

    return varTexto.replace(textoAnti, textoNuevo);




}




//Función que guarda el contenido de una clase y lo guarda en una variable.
function guardarYBorrarPorTagYClase(tag, clase) {

    
    var zonaPendiente = doc.getElementsByClassName(clase);

    var guardar = `<${tag} class=${clase} id="">${zonaPendiente[0].innerHTML}</${tag}>`;
     
    

    while (zonaPendiente.length > 0) {
        zonaPendiente[0].remove();
    }

    return guardar;
    
}




//Pasa a Pendientes el texto que se le indique
function pasarPendiente(texto) {
    

    var cont = doc.getElementById(`pendientes`);

    var textoP = cambiarContenido(contPendientes, `Texto de la tarea`, texto);

    textoP = cambiarContenido(textoP, `id=""`, `id=${contadorPendientes}`);


    cont.insertAdjacentHTML(`beforeend`, textoP);


    addOnClickPorClase(`del`, `borrar`, `this`);
    addOnClickPorClase(`end`, `acabar`, `this`);




    cont.lastElementChild.lastElementChild.firstElementChild.setAttribute(`id`, contadorPendientes + 100);
    cont.lastElementChild.lastElementChild.lastElementChild.setAttribute(`id`, contadorPendientes + 100);

    contadorPendientes++;
}



//Pasa a Acabadas el texto que se le indique.
function pasarAcabadas(texto) {
    
    var cont = doc.getElementById(`acabadas`);


    var textoA = cambiarContenido(contAcabadas, `Texto de la tarea`, texto);

    textoA = cambiarContenido(textoA, `id=""`, `id=${contadorAcabadas}`);


    cont.insertAdjacentHTML("beforeend", textoA);

    cont = doc.getElementById(contadorAcabadas);

    cont.lastElementChild.firstElementChild.setAttribute(`onclick`, `archivar(this)`);
    cont.lastElementChild.lastElementChild.setAttribute(`onclick`, `volver(this)`);

    cont.lastElementChild.firstElementChild.setAttribute(`id`, contadorAcabadas - 100);
    cont.lastElementChild.lastElementChild.setAttribute(`id`, contadorAcabadas - 100);

    contadorAcabadas--;


}






//Selecciona el texto del textarea y lo manda a la funcion pasarPendiente.
const anyadir = () => {

    var cont = doc.getElementsByTagName(`textarea`);

    if (cont[0].value == ``) {
        
        cont[0].value = `Escribe algo venga.`;
        return console.log(`Miras aquí pero no escribes nada. ;-;`);
    }


    pasarPendiente(`${cont[0].value}`);


};

//Selecciona el elemento y lo borra.
const borrar = (e) => {

   var id = parseInt(e.id) - 100;


    var cont = doc.getElementById(`${id}`);

    cont.remove();

    


}



//Selecciona el texto de este elemento y lo pasa a Acabadas, y después lo elimina de Pendientes.
const acabar = (e) => {

    var id = parseInt(e.id) - 100;


    var cont = doc.getElementById(`${id}`);

    var texto = cont.innerText;

    pasarAcabadas(texto);

    cont.remove();

}

//Selecciona el texto de este elemento y lo vuelve a mandar Pendientes.
const volver = (e) => {

    var id = parseInt(e.id) + 100;

    var cont = doc.getElementById(`${id}`);

    var texto = cont.innerText;



    pasarPendiente(texto);

    cont.remove();

    



}

//Selecciona el elemento y le cambia la clase a oculto para que desaparezca.
const archivar = (e) => {

    var id = parseInt(e.id) + 100;

    var cont = doc.getElementById(`${id}`);

    cont.setAttribute(`class`, `oculto`);


}

//Selecciona todos los elementos con clase oculto y se la cambia a acabada para que se vuelvan a ver.
const mostrar = () => {

    var cont = doc.getElementsByClassName(`oculto`);

    for (let i = 0; i < cont.length; i++) {
        cont[0].setAttribute(`class`, `acabada`);
        
    }

}



window.onload = () => {

    contPendientes = guardarYBorrarPorTagYClase(`div`, `tarea`);
    contAcabadas = guardarYBorrarPorTagYClase(`div`, `acabada`);
    addOnClickPorClase(`add`, `anyadir`);
    addOnClickPorClase(`sho`, `mostrar`);






    




} //Fin del código onload.




