// importaciones
import { sidebar, crearDB } from "./fuciones.js";


(function(){
    document.addEventListener('DOMContentLoaded', () => {
        // sidebar
        sidebar();

        // base de datos
        crearDB();
    })
    
})();


