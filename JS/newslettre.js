export function newsletterListener(){

const newsletter = document.querySelector('.rotate');
const buttonclose = document.getElementById('close_newsletter');
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
        openNewsletter.classList.remove('open');
        openNewsletter.style.display = '';
        newsletter.style.display = 'block';
        newsletterIsOpen = false;
    }

    buttonclose.addEventListener('click', function () {
        openNewsletter.classList.remove('open');
        openNewsletter.style.display = '';
        newsletter.style.display = 'block';
        newsletterIsOpen = false;
    })

    
})};