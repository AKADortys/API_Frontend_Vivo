//import des script des composants
import { headerListeners } from "../components/header.js";
import { horaireListeners } from "../components/horaire.js";
import { loginFormListeners } from "../components/loginForm.js";
import { signinListeners } from "../components/signinForm.js";
import { questionFormListener } from "../components/questionForm.js"
import { articlesListener } from "../components/cart.js";

//import des utilitaires
import { getArticles } from "../api/article.js";
import { AppStorage } from "./storage.js";

//Utilitaire pour la gestion de l'interface utilisateur
export const AppDom = {
    //récup des partials
    getPartials: async () =>{
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
                fetch("../../partials/newsletter.html").then((response) => response.text()),
                fetch("../../partials/header.html").then((response) => response.text()),
                fetch("../../partials/accueil-section.html").then((response) => response.text()),
                fetch("../../partials/connexion-section.html").then((response) =>response.text()),
                fetch("../../partials/contact-section.html").then((response) => response.text()),
                fetch("../../partials/produit-section.html").then((response) => response.text()),
                fetch("../../partials/profile-section.html").then((response) => response.text()),
                fetch("../../partials/panier-section.html").then((response) => response.text()),
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
        headerListeners();//navbar
        horaireListeners();//onglet horaires
        loginFormListeners();//formulaire de connexion
        signinListeners();//formulaire d'inscription
        questionFormListener();//formulaire de question
        articlesListener();//Boutons ajout au panier
        console.log("Écouteurs ajoutés");
    },

    //Méthode pour initialiser l'app
    init: async ()=>{
        await AppDom.getPartials();
        await getArticles();
        await AppDom.displayArticles();
        AppDom.addListeners();
    },
    
    //Méthode pour afficher les articles dans la section produit
    displayArticles: async ()=>{
    const articles = await AppStorage.get("articles")//récup des articles dans LS
    const section = document.getElementById('produit');

    let contentHTML = '';

    articles.forEach(e => {
        if(e.available){
            contentHTML += `
                <div class="article-card">
                    <h3>${e.label}</h3>
                    <p>${e.content}</p>
                    <p>Prix : ${e.price} Euro</p>
                    <input type="number" min="0" max="15" value="0" id="article${e.id}">
                    <button class="btn" data-article-id="${e.id}">Ajouter au panier</button>
                </div>
            `;

        }
    });
    section.innerHTML = contentHTML;
    },
    
    //Méthode pour afficher le détails de la commande courante
    displayCart: async ()=>{
        const articles = await AppStorage.get("details_order");// recup détails commande dans LS
        const panier = document.getElementById('panier');
        let contentHTML = '';
        panier.innerHTML = '';
        if(articles.articleOrders !==null) {
            articles.articleOrders.forEach(e => {
                contentHTML += `
                    <div class="article-card">
                        <h3>${e.label}</h3>
                        <p>Prix : ${e.price} Euro</p>
                        <p>Quantité : ${e.quantity}</p>
                        <p>Total : ${e.quantity * e.price} Euro</p>
                        <button class="btn" data-article-id="${e.articleId}">Retirer du panier</button>
                    </div>
                `;
            });
            panier.innerHTML = contentHTML;
        }
    }
          
};