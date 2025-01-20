//import des script des composants
import { headerListeners } from "../components/header.js";
import { horaireListeners } from "../components/horaire.js";
import { loginFormListeners } from "../components/loginForm.js";
import { signinListeners } from "../components/signinForm.js";
import { questionFormListener } from "../components/questionForm.js";
import { articlesListener, cartListener } from "../components/cart.js";
import { ProfileListener } from "../components/profile.js";

//import des utilitaires
import { getArticles } from "../api/article.js";
import { AppStorage } from "./storage.js";

//Utilitaire pour la gestion de l'interface utilisateur
export const AppDom = {
  //récup des partials
  getPartials: async () => {
    try {
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
        fetch("../../partials/newsletter.html").then((response) =>
          response.text()
        ),
        fetch("../../partials/header.html").then((response) => response.text()),
        fetch("../../partials/accueil-section.html").then((response) =>
          response.text()
        ),
        fetch("../../partials/connexion-section.html").then((response) =>
          response.text()
        ),
        fetch("../../partials/contact-section.html").then((response) =>
          response.text()
        ),
        fetch("../../partials/produit-section.html").then((response) =>
          response.text()
        ),
        fetch("../../partials/profile-section.html").then((response) =>
          response.text()
        ),
        fetch("../../partials/panier-section.html").then((response) =>
          response.text()
        ),
        fetch("../../partials/footer.html").then((response) => response.text()),
      ]);
      //injection du contenu dans les éléments html
      document.getElementById("newslettre").innerHTML = newsletter;
      document.querySelector("header").innerHTML = header;
      document.querySelector("main").innerHTML =
        accueil + connexion + contact + produit + panier + profile;
      document.querySelector("footer").innerHTML = footer;

      console.log("Partials chargées");
    } catch (error) {
      console.log(error);
    }
  },

  //Ajout des écouteur de l'initialisation de l'app
  addListeners: () => {
    // Ajouter les écouteurs aux éléments
    headerListeners(); //navbar
    horaireListeners(); //onglet horaires
    loginFormListeners(); //formulaire de connexion
    signinListeners(); //formulaire d'inscription
    questionFormListener(); //formulaire de question
    console.log("Écouteurs ajoutés");
  },

  //Méthode pour initialiser l'app
  init: async () => {
    const user = AppStorage.get("active_user");
    await AppDom.getPartials();
    await getArticles();
    await AppDom.displayArticles();
    if (user) {
      console.log("Utilisateur connecté :", user.nom);
      await AppDom.displayCart();
      document.getElementById("hidde_profile").style.display = "block";
    }
    AppDom.addListeners();
  },

  //Méthode pour afficher les articles dans la section produit
  displayArticles: async () => {
    const articles = await AppStorage.get("articles"); //récup des articles dans LS
    const section = document.getElementById("produit");

    let contentHTML = ``;

    articles.forEach((e) => {
      if (e.available) {
        contentHTML += `
                    <div class="card-article">
                      <h4>${e.label}</h4>
                      <p>${e.content}</p>
                      <p>${e.price} euro</p>
                      <input type="number" min="0" max="15" value="0" class="quantity" id="article${e.id}">
                      <button class="btn" data-article-id="${e.id}">Ajouter au panier</button></td>
                    </div>
            `;
      }
    });
    // contentHTML += "</div>";
    section.innerHTML = contentHTML;
    articlesListener();
  },

  //Méthode pour afficher le détails de la commande courante
  displayCart: async () => {
    const articles = (await AppStorage.get("details_order")) || null;
    const order = (await AppStorage.get("current_order").order) || null;
    const panier = document.getElementById("panier");
    let contentHTML = "";
    panier.innerHTML = "";
    if (articles.articleOrders !== null) {
      contentHTML += `
                <div class="content-child">
                <h3>Panier</h3>
                <table class="product">
                <th>Nom</th> <th>Compte</th> <th>Total</th> <th>Action</th>
            `;
      articles.articleOrders.forEach((e) => {
        contentHTML += `
                    <tr>
                        <td>${e.label}</td>
                        <td>${e.price} Euro X ${e.quantity}</td>
                        <td>${e.quantity * e.price} Euro</td>
                        <td><button class="btn-del" data-article-id="${e.articleId}">Retirer du panier</button></td>
                    </tr>
                `;
      });
      contentHTML += '</table></div> <div class="content-child">';
      if (order !== null) {
        contentHTML += `
                    <p>Total commande : <span>${order.totalPrice}</span> Euro</p>
                    <p><span>${order.totalQuantity}</span> article(s) dans votre panier</p>
                    <p>disponible : <span>${order.available ? "Disponible en magasin" : "Indisponible ou en cour de traitement"}</span></p>
                    <button class="btn" id="btn-order">Valider la commande</button>
                `;
      }
      panier.innerHTML = contentHTML;
      cartListener();
    }
  },

  //Méthode pour afficher les parametres utilisateur
  displayProfile: async () => {
    const user = await AppStorage.get("active_user");
    const historic = await AppStorage.get("orderHistoric");
    console.log(historic);
    const profile = document.getElementById("profile");
    let innerHTML = `
    <div class="content-child">
      <h2>Bonjour, ${user.prenom} ${user.nom}</h2>
      <p>Email : ${user.mail}</p>
      <p>Téléphone : ${user.phone}</p>
      <button class="btn" id="btn-logout">Se déconnecter</button>
      <button class="btn-edit" id="btn-edit-profile">Modifier mes informations</button>
    </div>
    <div class="content-child">
      <h2>Historique de commande</h2>
    `;
    historic.forEach((e) => {
      if (e.isConfirmed)
        innerHTML += `
        <div class="order-history">
          <h3>Commande n°${e.id}</h3>
          <p>Date : ${e.createdAt}</p>
          <p>Total : ${e.totalPrice} Euro</p>
          <p>Quantité : ${e.totalQuantity} article(s)</p>
        </div>
      `;
    });

    innerHTML += "</div>";
    profile.innerHTML = innerHTML;
    ProfileListener();
  },
  //Méthode pour afficher une alerte SweetAlert
  CreateAlert: (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      draggable: true,
    });
  },
};
