const list_header = document.getElementById('header-list');
const section_main = document.querySelectorAll('.contenue');
const title = document.getElementById('title');
const header = document.querySelector('header');
const main = document.querySelector('main');
const hidde_navbar = document.getElementById('hidde_navbar');
let navbarIsOpen = true;

hidde_navbar.addEventListener('click', function(){
    if(navbarIsOpen){
        header.style.transform = 'translateY(-20vh)';
        setTimeout(function(){
            header.style.display = 'none';
        }, 200)
        navbarIsOpen = false;
    } else {
        header.style.display = 'flex';
        setTimeout(function(){
            header.style.transform = 'translateY(0vh)';
        }, 50)
        navbarIsOpen = true;
    }
})


function closeSections(){
    section_main.forEach(function(section){
        section.style.display = 'none';
        section.style.opacity = '0';
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
        element.style.border = "0.1em solid gold";
        const id = this.getAttribute('data-section');
        const section = document.getElementById(id);
        section.style.display = 'flex';
        title.style.display = 'none';
        setTimeout(function(){
            section.style.opacity = '1';
        }, 100);
    })
})