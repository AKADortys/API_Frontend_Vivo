import { authFetch } from "./auth.js";
import { AppStorage } from "../utils/storage.js";
import { ArticlesOrders } from "./panier.js";

// Récupère ou crée une commande pour l'utilisateur courant
export async function OrderGetOrCreate(id) {
  try {
    const options = { method: "GET" };
    const response = await authFetch(
      `http://localhost:3000/order/current/${id}`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`
      );
    }

    const order = await response.json();
    AppStorage.set("current_order", order); //stockage
    console.log("Commande trouvée !");
    return order;
  } catch (err) {
    console.error("Erreur lors de la récupération de la commande :", err);
    return null;
  }
}

export async function ConfirmOrder(id) {
  try {
    const options = { method: "PUT" };
    const response = await authFetch(
      `http://localhost:3000/order/${id}/confirm`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`
      );
    }
    console.log("Commande confirmée!");
    return response.json();
  } catch (err) {
    console.error("Erreur lors de la confirmation de la commande :", err);
    return null;
  }
}

export async function GetOrderHistoric(id) {
  try {
    const options = { method: "GET" };
    const response = await authFetch(
      `http://localhost:3000/order/getUserOrders/${id}`,
      options
    );
    const historic = await response.json();
    let orderHistoric = [];

    for (const element of historic) {
      const detail = await ArticlesOrders(element.id);
      if (!detail) continue; // Si la commande n'existe pas, on passe à la suivante
      delete detail.ok;
      orderHistoric.push({ ...element, detail });
    }

    // Stockage dans localStorage après avoir construit l'objet complet
    AppStorage.set("orderHistoric", orderHistoric);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'historique des commandes :",
      err
    );
    return null;
  }
}
