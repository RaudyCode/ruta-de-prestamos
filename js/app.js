// importaciones
import { sidebar, crearDB, obtenerClientes, eliminarCliente, buscarClientePorNombre, modificarSemanas} from "./fuciones.js";
import { listadoCliente, buscarInput, incrementarBtn, decrementarBtn } from "./variables.js";


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


        // incrementar y decrementar semanas
        incrementarBtn.addEventListener("click", (e)=>{
            e.preventDefault();

            const confirmar = confirm("Estas seguro de Incrementar las semanas?");

            if(confirmar){
                modificarSemanas("incrementar");
            }
            
        });

        decrementarBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            const confirmar = confirm("Estas seguro de Decrementar las semanas?");
            
            if(confirmar){
                modificarSemanas("decrementar");
            }
        });
    });

    
})();


