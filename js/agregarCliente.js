import { formulario } from "./variables.js";
import { imprimirAlerta } from "./fuciones.js";

(function(){
    let DB;

    


    document.addEventListener("DOMContentLoaded", ()=>{
        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    });

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('clientes', 1);
    
        abrirConexion.onerror = function() {
            console.log("Hubo un error al conectarse a la base de datos");
        };
    
        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;
            console.log("Base de datos conectada correctamente");
        };
    
        abrirConexion.onupgradeneeded = function(e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('clientes')) {
                const objectStore = db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('cedula', 'cedula', { unique: true });
                console.log("Base de datos creada");
            }
        };
    }

    function validarCliente(e){
        e.preventDefault();

        // leer todos los inputs
        const nombre = document.querySelector("#nombre").value;
        const cedula = document.querySelector("#cedula").value;
        const fecha = document.querySelector("#fecha").value;
        const direccion = document.querySelector("#direccion").value;
        const monto = document.querySelector("#monto").value;
        const numero = document.querySelector("#numero").value;

        if(nombre==="" || cedula==="" || fecha==="" || direccion==="" || monto==="" || numero===""){
            imprimirAlerta("Todos los campos son obligatorios", "error");

            return;
        };

        // crear un objeto con los datos

        const cliente = {
            nombre,
            cedula,
            fecha,
            direccion,
            monto,
            numero,
            cuota:Number(monto) / 10,
            semana:0,
            id:Date.now()
        };

        crearNuevoCliente(cliente);
    };


    function crearNuevoCliente(cliente){
        if(!DB){
            console.log("La base de datos aún no está disponible.");
            console.log("Hubo un error con la base de datos")
            return;
        };

        const transaction = DB.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');

        objectStore.add(cliente);

        transaction.oncomplete = function() {
            imprimirAlerta("Cliente agregado Correctamente");

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };

        transaction.onerror = function() {
            imprimirAlerta("Todos los campos son obligatorios", "error");
        };
    }

    

})();