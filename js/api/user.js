import { OrderGetOrCreate } from "./order.js";
import { AppStorage } from "../utils/storage.js";
import { ArticlesOrder } from "./panier.js";
import { GetOrderHistoric } from "./order.js";
import { AppDom } from "../utils/dom.js";

//requêtes pour la connection
export async function login(data) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status === 401) {
      AppDom.CreateAlert("La tentative de connection a échouée", "", "error");
      return false;
    }

    const result = await response.json();

    if (result.success) {
      AppDom.CreateAlert("Connection réussie", "", "success");
      // Stockage des informations utilisateur et token
      AppStorage.set("active_user", result.user); //stockage
      AppStorage.set("Token", result.user.accessToken); //stockage

      //recup de la commande actuelle
      const order = await OrderGetOrCreate(result.user.id_user);
      AppStorage.set("current_order", order);
      await ArticlesOrder();
      await GetOrderHistoric(result.user.id_user);
      AppDom.displayCart();
      document.getElementById("hidde_profile").style.display = "block";
      AppDom.displayProfile();
    }
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    AppDom.CreateAlert(
      "Une erreur est suvrnue",
      "Une erreur est survenue lors de la connexion. Veuillez réessayer.",
      "error"
    );
  }
}

//requêtes pour la création d'un compte
export async function register(data) {
  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.status !== 200) {
        throw new Error("Erreur lors de l'ajout de l'utilisateur");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Réussie:", data);
      AppDom.CreateAlert("Votre inscription est validée!", "", "success");
    })
    .catch((error) => {
      console.error("Error:", error);
      AppDom.CreateAlert(
        "Une erreur est survenue : ",
        `${error.message}`,
        "error"
      );
    });
}
