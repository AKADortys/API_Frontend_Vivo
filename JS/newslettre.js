const newsletter = document.querySelector('.rotate');

newsletter.addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('newslettre').classList.add('open');
});