const newsletter = document.querySelector('.rotate');
const openNewsletter = document.getElementById('newslettre');
let newsletterIsOpen = false

newsletter.addEventListener('click', function () {
    if(!newsletterIsOpen){
        this.style.display = 'none';
        openNewsletter.style.display = 'flex';
        setTimeout(function () {
            openNewsletter.classList.add('open');
        },50)
        newsletterIsOpen = true;
    }
    else{
        closeNewsletter();
    }
});

function closeNewsletter(){
    openNewsletter.classList.remove('open');
    newsletter.style.display = 'block';
    newsletterIsOpen = false;
};