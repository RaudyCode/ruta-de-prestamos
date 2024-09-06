import { imprimirAlerta } from "./fuciones.js";

(function(){
    console.log("hola")
    let idCliente;
    let DB;
    const nombreInput = document.querySelector("#nombre");
    const cedulaInput = document.querySelector("#cedula");
    const fechaInput = document.querySelector("#fecha");
    const direccionInput = document.querySelector("#direccion");
    const montoInput = document.querySelector("#monto");
    const numeroInput = document.querySelector("#numero");
    const cuotaInput = document.querySelector("#cuota");
    const semanaInput = document.querySelector("#semana");

    const formulario = document.querySelector("#formulario");

    document.addEventListener("DOMContentLoaded", ()=>{
        conectarDB();

        // verificar el id de la url
        const parametrosURL= new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');

        // actualizar el registro
        formulario.addEventListener('submit', actualizarClientes);


        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    });

    function actualizarClientes(e){
        e.preventDefault();
        if(nombreInput.value === '' ||  cedulaInput.value ==='' || fechaInput.value === '' || direccionInput.value === '' || montoInput.value === '' || numeroInput.value==='' || cuotaInput.value === '' || semanaInput.value === ''){
            imprimirAlerta("Todos los campos son obligatorios", 'error');

            return;
        }

        // actualizar el cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            cedula: cedulaInput.value,
            fecha: fechaInput.value,
            direccion: direccionInput.value,
            monto: montoInput.value,
            numero: numeroInput.value,
            cuota: cuotaInput.value,
            semana: semanaInput.value,
            id:Number(idCliente)
        }

        const transaction = DB.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');


        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            imprimirAlerta('cliente Actualizado Correctamente')

            window.location.href = 'index.html'
        }

        transaction.onerror = function(){
            imprimirAlerta("hubo un error", 'error')
        }

    };

    function obtenerCliente(id){

        if (!DB) {
            console.log("La base de datos aún no está disponible.");
            imprimirAlerta("Hubo un error con la base de datos", "error");
            return;
        }
        const transaction = DB.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');

        const cliente = objectStore.openCursor();

        cliente.onsuccess = function (e) {
            const cursor = e.target.result;

            if(cursor){
                
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    };
    function conectarDB() {
        const abrirConexion = window.indexedDB.open('clientes', 1);
    
        abrirConexion.onerror = function() {
            console.log("Hubo un error");
        };
    
        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;
        };
    
    }

    function llenarFormulario(datosCliente){
        const {nombre, cedula, fecha, direccion, monto, numero, cuota, semana} = datosCliente;
        nombreInput.value = nombre;
        cedulaInput.value = cedula;
        fechaInput.value = fecha;
        direccionInput.value = direccion;
        montoInput.value = monto;
        numeroInput.value = numero;
        cuotaInput.value = cuota;
        semanaInput.value = semana;
        
    }



})();