const list_header = document.getElementById('header-list');
const section_main = document.querySelectorAll('.contenue');
const title = document.getElementById('title');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const hidde_navbar = document.getElementById('hidde_navbar');
let navbarIsOpen = false;

hidde_navbar.addEventListener('click', function(){
    if(navbarIsOpen){
        header.style.display = 'flex';
        footer.style.display = '';
        navbarIsOpen = false;
        setTimeout(function(){
            header.classList.remove('navbar-closed');
        },80)
        main.classList.remove('main-shifted');
    } else {
        header.classList.add('navbar-closed');
        setTimeout(function(){
            header.style.display = 'none';
            footer.style.display = 'none';
        },60)
        navbarIsOpen = true;
        main.classList.add('main-shifted');
    }
})


function closeSections(){
    section_main.forEach(function(section){
        section.classList.remove('active');
        section.style.display= 'none';
        title.style.display = 'block';
        Array.from(list_header.children).forEach(function(element) {
            element.style.backgroundColor ="";
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
        section.style.display = 'flex';
        setTimeout(function(){
            section.classList.add('active');
        }, 10);
    })
})
