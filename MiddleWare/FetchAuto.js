async function authFetch(url, options = {}) {
    options.credentials = 'include';
  
    try {
      // Exécuter la requête
      let response = await fetch(url, options);
  
      // Si le token est expiré, on tente de rafraîchir le token
      if (response.status === 401) {
        const refreshSuccess = await refreshAccessToken();
        if (refreshSuccess) {
          response = await fetch(url, options); // Relance la requête originale
        } else {
            // Si le rafraîchissement échoue, on déconnecte l'utilisateur
            alert("Votre session a expiré. Veuillez vous reconnecter.");
          return;
        }
      }
      
      return response;
    } catch (error) {
      console.error("Erreur dans authFetch :", error);
      throw error;
    }
  }
  
  // Fonction pour rafraîchir le token d'accès
  async function refreshAccessToken() {
    try {
      const response = await fetch('http://localhost:3000/auth/refresh', {
        method: 'POST',
        credentials: 'include' // Inclus les cookies sécurisés pour l'authentification
      });
  
      if (response.ok) {
        return true;
      } else {
        return false; // Rafraîchissement échoué
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token :", error);
      return false;
    }
  }
  
  export {refreshAccessToken, authFetch}