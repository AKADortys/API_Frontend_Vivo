import {
  ArticlesOrder,
  addArticleToOrder,
  removeArticle,
} from "../api/panier.js";
import { OrderGetOrCreate, ConfirmOrder } from "../api/order.js";
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
          return AppDom.CreateAlert(
            "Vous n'êtes pas connecté(e) ! ",
            "vous pouvez créer un compte via l'onglet Connection",
            "warning"
          );
        const quantityInput = document.getElementById(`article${id}`);
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity <= 0 || quantity > 15) {
          console.error("Quantité invalide ou hors limite !");
          return AppDom.CreateAlert(
            "Quantité invalide ou hors limite !",
            "Veuillez entrer une quantité valide (entre 1 et 15).",
            "warning"
          );
        }

        await addArticleToOrder(id, quantity); //appel de la fonction pour l'ajout d'un article au panier
        await ArticlesOrder(); // recuperer le détails de la commande mis à jour
        await OrderGetOrCreate(AppStorage.get("active_user").id_user); // récupérer la commande mis à jour
        await AppDom.displayCart(); //afficher la mise à jour du panier
        quantityInput.value = 0; //réinitialise la valeur de l'input
        return AppDom.CreateAlert(
          "Article ajouté au panier",
          "vous pouvez consulter votre panier via l'onglet Panier",
          "success"
        );
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article au panier :", error);
        AppDom.CreateAlert(
          "Une erreur est survenue",
          "Une erreur est survenue lors de l'ajout au panier.",
          "error"
        );
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
        await OrderGetOrCreate(AppStorage.get("active_user").id_user); // récupérer la commande mis à jour
        await ArticlesOrder(); // récupérer le détails de la commande mis à jour
        await AppDom.displayCart(); //afficher la mise à jour du panier
        AppDom.CreateAlert("Article supprimé du panier", "", "success");
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'article du panier :",
          error
        );
        AppDom.CreateAlert(
          "Une erreur est survenue",
          "Une erreur est survenue lors de la suppression du panier.",
          "error"
        );
      }
    });
  });

  const confirmOrder = document.getElementById("btn-order");
  confirmOrder.addEventListener("click", async function () {
    try {
      await ConfirmOrder(AppStorage.get("current_order").order.id); // appel de la fonction pour la confirmation de la commande
      await AppStorage.remove("current_order"); // supprimer la commande courante
      await AppStorage.remove("details_order"); // supprimer les détails de la commande
      await OrderGetOrCreate(AppStorage.get("active_user").id_user); // récupérer la commande mis à jour
      await ArticlesOrder(); // récupérer le détails de la commande mis à jour
      await AppDom.displayCart(); // afficher la mise à jour du panier
      AppDom.CreateAlert(
        "Commande confirmée",
        "Merci de votre commande!",
        "success"
      );
    } catch (error) {
      console.error("Erreur lors de la confirmation de la commande :", error);
      AppDom.CreateAlert(
        "Une erreur est survenue",
        "Une erreur est survenue lors de la confirmation de votre commande.",
        "error"
      );
    }
  });
}
