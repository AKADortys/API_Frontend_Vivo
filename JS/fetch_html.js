
export function loadPartials(){
// Charger les fichiers partiels HTML
Promise.all([
    fetch("Partials/newsletter.html").then(response => response.text()),
    fetch("Partials/header.html").then(response => response.text()),
    fetch("Partials/main.html").then(response => response.text()),
    fetch("Partials/footer.html").then(response => response.text())
  ])
  .then(([newsletter, header, main, footer]) => {
    document.getElementById("newslettre").innerHTML = newsletter;
    document.querySelector("header").innerHTML = header;
    document.querySelector("main").innerHTML = main;
    document.querySelector("footer").innerHTML = footer;

    console.log("partials loaded");
    
  });
  
}