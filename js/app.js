// importaciones
import { sidebar, crearDB, obtenerClientes, eliminarCliente, buscarClientePorNombre} from "./fuciones.js";
import { listadoCliente, buscarInput } from "./variables.js";


(function(){
    document.addEventListener('DOMContentLoaded', () => {
        // sidebar
        sidebar();

        // base de datos
        crearDB();

        // obtener los clientes de la DB
        setTimeout(() => {
            if(window.indexedDB.open('clientes', 1)){
                obtenerClientes();
            }
        }, 1000);


        listadoCliente.addEventListener('click', eliminarCliente);

        // escuchar el input en tiempro real - busqueda de clientes
        buscarInput.addEventListener('input', buscarClientePorNombre);
    })

    
})();


