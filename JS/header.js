const list_header = document.getElementById('header-list');
const section_main = document.querySelectorAll('.contenue');
const title = document.getElementById('title');
const header = document.querySelector('header');
const main = document.querySelector('main');
const hidde_navbar = document.getElementById('hidde_navbar');
let navbarIsOpen = false;

hidde_navbar.addEventListener('click', function(){
    if(navbarIsOpen){
        header.classList.remove('navbar-closed');
        navbarIsOpen = false;
    } else {
        header.classList.add('navbar-closed');
        navbarIsOpen = true;
    }
})


function closeSections(){
    section_main.forEach(function(section){
        section.classList.remove('active');
        section.style.display= 'none';
        title.style.display = 'block';
        Array.from(list_header.children).forEach(function(element) {
            element.style.backgroundColor ="";
            element.style.border = "";
        })
    })
};


Array.from(list_header.children).forEach(function(element) {
    element.addEventListener('click', function(){
        closeSections();
        element.style.backgroundColor ="rgba(100, 100, 99, 0.675)";
        const id = this.getAttribute('data-section');
        const section = document.getElementById(id);
        title.style.display = 'none';
        section.style.display = 'flex'; // Afficher l'élément immédiatement
        setTimeout(function(){
            section.classList.add('active');
        }, 10); // Laisser un petit délai avant de lancer l'animation d'opacité
    })
})