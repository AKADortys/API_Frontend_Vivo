import { ArticlesOrder,addArticleToOrder, removeArticle } from "../api/panier.js";
import { AppDom } from "../utils/dom.js";

//Listener pour le bouton ajouter au panier
export function articlesListener() {
    const articlesBtn = document.querySelectorAll(".btn");
    articlesBtn.forEach((btn) => {
        const id = btn.getAttribute("data-article-id");
        btn.addEventListener("click", async function () {
            try {
                const quantityInput = document.getElementById(`article${id}`);
                const quantity = parseInt(quantityInput.value);
                
                if (isNaN(quantity) || quantity <= 0 || quantity > 15) {
                    console.error("Quantité invalide ou hors limite !");
                    alert("Veuillez entrer une quantité valide (entre 1 et 15).");
                    return;
                }

                await addArticleToOrder(id, quantity); //appel de la fonction pour l'ajout d'un article au panier
                await ArticlesOrder();// recuperer le détails de la commande mis à jour 
                await AppDom.displayCart();//afficher la mise à jour du panier
                articlesListener(); // Réattacher les écouteurs
                console.log(`Article ${id} ajouté au panier avec ${quantity} exemplaires`);
                quantityInput.value = 0; //réinitialise la valeur de l'input
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'article au panier :", error);
                alert("Une erreur est survenue lors de l'ajout au panier.");
            }
        });
    });
}

export function cartListener() {
    const deleteBtns = document.querySelectorAll(".btn-del");
    deleteBtns.forEach((btn) => {
        const id = btn.getAttribute("data-article-id");
        btn.addEventListener("click", async function () {
            try {
                await removeArticle(id); //appel de la fonction pour la suppression d'un article du panier
                await ArticlesOrder(); // récupérer le détails de la commande mis à jour
                await AppDom.displayCart(); //afficher la mise à jour du panier
                cartListener(); // Réattacher les écouteurs
                console.log(`Article ${id} supprimé du panier`);
            } catch (error) {
                console.error("Erreur lors de la suppression de l'article du panier :", error);
                alert("Une erreur est survenue lors de la suppression du panier.");
            }
        });
    })
}
