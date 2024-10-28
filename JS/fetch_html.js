export async function loadPartials() {
  // Charger les fichiers partiels HTML
  const [newsletter, header, main, footer] = await Promise.all([
    fetch("Partials/newsletter.html").then(response => response.text()),
    fetch("Partials/header.html").then(response => response.text()),
    fetch("Partials/main.html").then(response => response.text()),
    fetch("Partials/footer.html").then(response => response.text())
  ]);

  document.getElementById("newslettre").innerHTML = newsletter;
  document.querySelector("header").innerHTML = header;
  document.querySelector("main").innerHTML = main;
  document.querySelector("footer").innerHTML = footer;

  console.log("Partials chargées");
}
