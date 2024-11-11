export async function loadPartials() {
  // Charger les fichiers partiels HTML
  const [
    newsletter,
    header,
    accueil,
    connexion,
    contact,
    produit,
    profile,
    panier,
    footer,
  ] = await Promise.all([
    fetch("Partials/newsletter.html").then((response) => response.text()),
    fetch("Partials/header.html").then((response) => response.text()),
    fetch("Partials/accueil-section.html").then((response) => response.text()),
    fetch("Partials/connexion-section.html").then((response) =>response.text()),
    fetch("Partials/contact-section.html").then((response) => response.text()),
    fetch("Partials/produit-section.html").then((response) => response.text()),
    fetch("Partials/profile-section.html").then((response) => response.text()),
    fetch("Partials/panier-section.html").then((response) => response.text()),
    fetch("Partials/footer.html").then((response) => response.text()),
  ]);

  document.getElementById("newslettre").innerHTML = newsletter;
  document.querySelector("header").innerHTML = header;
  document.querySelector("main").innerHTML =
    accueil + connexion + contact + produit + panier + profile;
  document.querySelector("footer").innerHTML = footer;

  console.log("Partials chargées");
}
