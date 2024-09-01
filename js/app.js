// variables 



// clases



// eventListeners

document.addEventListener('DOMContentLoaded', () => {
    // sidebar
    sidebar();
})


// funciones

function sidebar(){
    const navBar = document.querySelector("nav");
    const menuBtns = document.querySelectorAll(".menu-icon");
    const overlay = document.querySelector(".overlay");

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
