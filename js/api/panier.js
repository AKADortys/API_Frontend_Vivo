import { authFetch } from "./auth.js";
import { AppStorage } from "../utils/storage.js";

// Récupère la liste des articles d'une commande
export async function ArticlesOrder() {
  try {
    const commande = AppStorage.get("current_order").order; // récupère la commande courante
    if (!commande) {
      console.error("Commande non trouvée dans localStorage.");
      throw new Error("Commande non trouvée.");
    }
    const options = { method: "GET" };
    const response = await authFetch(
      `http://localhost:3000/ArticleOrder/article/${commande.id}`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`
      );
    }

    const Article = await response.json();

    AppStorage.set("details_order", Article); //stockage
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des articles de la commande :",
      err
    );
    return null;
  }
}

export async function ArticlesOrders(id) {
  try {
    const options = { method: "GET" };
    const response = await authFetch(
      `http://localhost:3000/ArticleOrder/article/${id}`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`
      );
    }

    const Article = await response.json();
    return Article;
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des articles de la commande :",
      err
    );
    return null;
  }
}

// Ajoute un article à la commande courante
export async function addArticleToOrder(articleId, quantity) {
  try {
    const commande = AppStorage.get("current_order").order; // récupère la commande courante
    if (quantity <= 0) {
      console.error("Erreur : articleId ou quantité invalide.");
      throw new Error("Erreur : articleId ou quantité invalide.");
    }
    const data = { id_article: articleId, quantity: quantity };
    const options = { method: "POST", body: JSON.stringify(data) };
    const response = await authFetch(
      `http://localhost:3000/order/${commande.id}/articlesAdd`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'article :", err);
    return null;
  }
}

// Supprime un article de la commande courante
export async function removeArticle(articleId) {
  try {
    const orderId = AppStorage.get("current_order").order.id;
    const data = { id_article: articleId };
    const options = { method: "DELETE", body: JSON.stringify(data) };
    const response = await authFetch(
      `http://localhost:3000/order/${orderId}/articlesDel`,
      options
    );
    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    return null;
  }
}
