import { AppStorage } from "../utils/storage.js";
import { AppDom } from "../utils/dom.js";
// Requête fetch avec authentification
export async function authFetch(url, options = {}) {
  try {
    const accessToken = AppStorage.get("Token"); //récupération du token
    if (!accessToken) {
      console.error("Utilisateur non trouvé dans localStorage.");
      throw new Error("Utilisateur non connecté.");
    }

    // Ajout du header Authorization
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    // Effectuer la requête
    let response = await fetch(url, options);

    // Gestion des erreurs 401
    if (response.status === 401) {
      console.warn("Token expiré, tentative de rafraîchissement...");
      const refreshSuccess = await refreshAccessToken();
      if (refreshSuccess) {
        accessToken = AppStorage.get("Token"); //stockage
        options.headers.Authorization = `Bearer ${accessToken}`;
        response = await fetch(url, options);
      } else {
        console.error("Impossible de rafraîchir le token.");
        AppDom.CreateAlert(
          "Re-connection requise",
          "Veuillez vous reconnecter pour effectuer cette action",
          "info"
        );
      }
    }

    return response;
  } catch (error) {
    console.error("Erreur dans authFetch :", error);
    throw error;
  }
}

// Rafraîchit le token via une API et le stocke dans IndexedDB
async function refreshAccessToken() {
  try {
    console.log("refresh access token");
    const accessToken = AppStorage.get("Token"); //récupération du token
    const response = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      AppStorage.set("Token", JSON.stringify(data.accessToken)); //stockage
      return true;
    }
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    return false;
  }
}
