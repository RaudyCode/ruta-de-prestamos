import { menuBtns, navBar, overlay, formulario } from "./variables.js";
let DB;
// funciones

export function sidebar(){
    menuBtns.forEach((menuBtn) =>{
        menuBtn.addEventListener("click", ()=>{
            navBar.classList.toggle("open");
        });
    });

    overlay.addEventListener('click', () =>{
        console.log('hola')
        navBar.classList.remove("open");
    })
}

export function crearDB(){
    const crearDB = window.indexedDB.open('clientes', 1);

    crearDB.onerror = function(){
        console.log("Hubo un error al conectarse");
    };

    crearDB.onsuccess = function(e){
        DB = crearDB.result;
    };

    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('clientes', {keyPath:'id', autoIncrement:true});

        objectStore.createIndex("nombre", "nombre", {unique:false});
        objectStore.createIndex("cedula", "cedula", {unique:true});
        objectStore.createIndex("fecha", "fecha", {unique:false});
        objectStore.createIndex("direccion", "direccion", {unique:false});
        objectStore.createIndex("monto", "monto", {unique:false});
        objectStore.createIndex("numero", "numero", {unique:false});
        objectStore.createIndex("cuotas", "cuotas", {unique:false});
        objectStore.createIndex("semana", "semana", {unique:false});

        console.log("DB lista y Creada")
    }
}


export function imprimirAlerta(mensaje, tipo){
    const alerta = document.querySelector('.alerta');

    if(!alerta){
        // crear alerta
        const divMensaje = document.createElement('div');
        divMensaje.classList.add("alerta");


        if(tipo === "error"){
            divMensaje.classList.add("error");
        }else{
            divMensaje.classList.add('exito')
        }

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);


        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
     
    }


}

export function obtenerClientes(){
    const abrirConexion = window.indexedDB.open('clientes', 1);

    abrirConexion.onsuccess = function (){
        DB = abrirConexion.result;
        const objectStore = DB.transaction('clientes').objectStore('clientes');

        objectStore.openCursor().onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                const {nombre,cedula,fecha,direccion,monto,numero,cuota,semana,id} = cursor.value;

                const listadoCliente = document.querySelector(".cuerpo-clientes");

                listadoCliente.innerHTML += `

                    <tr class="cliente">
                      <td>${nombre}</td>
                      <td>${cedula}</td>
                      <td>${fecha}</td>
                      <td>${monto}</td>
                      <td>${cuota}</td>
                      <td>${semana}</td>
                      <td class="btn-action">
                        <a href="editar-cliente.html?id=${id}" class="editar" >Editar</a>
                        <a href="#" class="eliminar" data-Cliente="${id}">Eliminar</a>
                      </td>
                    </tr>
                
                `

                cursor.continue();
            }else{
                console.log("no hay mas registros...")
            }
        }
    
    }

    abrirConexion.onerror = function(){
        console.log("Hubo un error al llamar a los clientes")
    }
}