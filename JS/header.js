const list_header = document.getElementById('header-list');
const section_main = document.querySelectorAll('.contenue');
const title = document.getElementById('title');


function closeSections(){
    section_main.forEach(function(section){
        section.style.display = 'none';
        section.style.opacity = '0';
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