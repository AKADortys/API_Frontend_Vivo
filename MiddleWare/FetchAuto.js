
// Requête fetch avec authentification
export async function authFetch(url, options = {}) {
  
  try {
    const user = JSON.parse(localStorage.getItem("active_user"));
    if (!user) {
      console.error("Utilisateur non trouvé dans localStorage.");
      throw new Error("Utilisateur non connecté.");
    }

    let accessToken = user.accessToken;

    if (!accessToken) {
      console.error("Token d'accès manquant.");
      throw new Error("Token d'accès introuvable ou expiré.");
    }

    // Ajout du header Authorization
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    console.log("URL de la requête :", url);
    console.log("Options envoyées :", options);

    // Effectuer la requête
    let response = await fetch(url, options);
    console.log("Statut de la réponse :", response.status);

    // Gestion des erreurs 401
    if (response.status === 401) {
      console.warn("Token expiré, tentative de rafraîchissement...");
      const refreshSuccess = await refreshAccessToken();
      if (refreshSuccess) {
        accessToken = await getAccessToken();
        options.headers.Authorization = `Bearer ${accessToken}`;
        response = await fetch(url, options);
      } else {
        console.error("Impossible de rafraîchir le token.");
        return null;
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
    const response = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.clear();
      localStorage.setItem("Token", JSON.stringify(data.user));
      return true;
    } else {
      console.warn("Échec du rafraîchissement du token :", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    return false;
  }
}
