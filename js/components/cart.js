import {
  ArticlesOrder,
  addArticleToOrder,
  removeArticle,
} from "../api/panier.js";
import { OrderGetOrCreate } from "../api/order.js";
import { AppDom } from "../utils/dom.js";
import { AppStorage } from "../utils/storage.js";

//Listener pour le bouton ajouter au panier
export async function articlesListener() {
  const articlesBtn = document.querySelectorAll(".btn");
  articlesBtn.forEach((btn) => {
    const id = btn.getAttribute("data-article-id");
    btn.addEventListener("click", async function () {
      try {
        const user = AppStorage.get("active_user");
        if (!user)
          return Swal.fire(
            "Vous n'êtes pas connecté(e), vous pouvez créer un compte via l'onglet Connection "
          );
        const quantityInput = document.getElementById(`article${id}`);
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity <= 0 || quantity > 15) {
          console.error("Quantité invalide ou hors limite !");
          Swal.fire("Veuillez entrer une quantité valide (entre 1 et 15).");
          return;
        }

        await addArticleToOrder(id, quantity); //appel de la fonction pour l'ajout d'un article au panier
        await ArticlesOrder(); // recuperer le détails de la commande mis à jour
        await OrderGetOrCreate(AppStorage.get("active_user").id_user); // récupérer la commande mis à jour
        await AppDom.displayCart(); //afficher la mise à jour du panier
        Swal.fire(`Article ajouté au panier avec ${quantity} exemplaires`);
        quantityInput.value = 0; //réinitialise la valeur de l'input
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article au panier :", error);
        Swal.fire("Une erreur est survenue lors de l'ajout au panier.");
      }
    });
  });
}

export async function cartListener() {
  const deleteBtns = document.querySelectorAll(".btn-del");
  deleteBtns.forEach((btn) => {
    const id = btn.getAttribute("data-article-id");
    btn.addEventListener("click", async function () {
      try {
        await removeArticle(id); //appel de la fonction pour la suppression d'un article du panier
        await ArticlesOrder(); // récupérer le détails de la commande mis à jour
        await OrderGetOrCreate(AppStorage.get("active_user").id_user); // récupérer la commande mis à jour
        await AppDom.displayCart(); //afficher la mise à jour du panier
        cartListener(); // Réattacher les écouteurs
        Swal.fire("Article supprimé du panier");
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'article du panier :",
          error
        );
        Swal.fire("Une erreur est survenue lors de la suppression du panier.");
      }
    });
  });
}
