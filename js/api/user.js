import { OrderGetOrCreate } from "./order.js";
import { endPoint } from "./endpoint.js";
import { AppStorage } from "../utils/storage.js";
import { ArticlesOrder } from "./panier.js";
import { GetOrderHistoric } from "./order.js";
import { AppDom } from "../utils/dom.js";
import { authFetch } from "./auth.js";

//requêtes pour la connection
export async function login(data) {
  try {
    const response = await fetch(`${endPoint.Base_url}auth/login`, {
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
  fetch(`${endPoint.Base_url}auth/register`, {
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
export async function update(data) {
  try {
    const userId = AppStorage.get("active_user")?.id_user;
    if (!userId) {
      throw new Error("Utilisateur non identifié. Veuillez vous reconnecter.");
    }

    const url = `${endPoint.Base_url}user/updateUser/${userId}`;
    console.log(`URL : ${url}`);

    const response = await authFetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.utilisateur) {
      AppStorage.set("active_user", result.utilisateur); // Mise à jour des données locales
      AppDom.CreateAlert(
        "Vos informations ont été mises à jour!",
        "",
        "success"
      );
      return true; // Indique un succès
    } else {
      throw new Error("La mise à jour a échoué.");
    }
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    AppDom.CreateAlert(
      "Une erreur est survenue lors de la mise à jour",
      `${error.message}`,
      "error"
    );
    return false; // Indique un échec
  }
}
