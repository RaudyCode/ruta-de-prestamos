// importaciones
import { sidebar, crearDB, obtenerClientes } from "./fuciones.js";


(function(){
    document.addEventListener('DOMContentLoaded', () => {
        // sidebar
        sidebar();

        // base de datos
        crearDB();

        // obtener los clientes de la DB
        if(window.indexedDB.open('clientes', 1)){
            obtenerClientes();
        }
    })

    
})();


