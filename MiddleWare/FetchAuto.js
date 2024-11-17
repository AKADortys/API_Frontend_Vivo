// Fonction pour récupérer le token depuis IndexedDB
async function getAccessToken() {
  const db = await initDB(); // Ouvre la connexion IndexedDB
  const tx = db.transaction("tokens", "readonly");
  const store = tx.objectStore("tokens");
  
  return new Promise((resolve, reject) => {
    const request = store.get("accessToken");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Erreur lors de la récupération du token.");
  });
}


// Fonction pour mettre à jour le token dans IndexedDB
async function setAccessToken(token) {
  const db = await initDB();
  const tx = db.transaction("tokens", "readwrite");
  const store = tx.objectStore("tokens");
  await store.put(token, "accessToken");
}

// Fonction pour l’authFetch avec récupération et mise à jour du token
async function authFetch(url, options = {}) {
  options.credentials = 'include';

  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error("Aucun token d'accès trouvé.");
    throw new Error("Token d'accès manquant.");
  }

  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`, 
  };

  try {
    let response = await fetch(url, options);
    if (response.status === 401) {
      const refreshSuccess = await refreshAccessToken();
      if (refreshSuccess) {
        const newAccessToken = await getAccessToken();
        options.headers.Authorization = `Bearer ${newAccessToken}`;
        response = await fetch(url, options);
      } else {
        alert("Votre session a expiré. Veuillez vous reconnecter.");
        return;
      }
    }

    return response;
  } catch (error) {
    console.error("Erreur dans authFetch :", error);
    console.log("URL de la requête:", url);
    console.log("Options de la requête:", options);
    throw error;
  }
}

// Fonction de rafraîchissement avec mise à jour dans IndexedDB
async function refreshAccessToken() {
  try {
    const response = await fetch('http://localhost:3000/auth/refresh', {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      await setAccessToken(data.accessToken); // Enregistre le nouveau token
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    return false;
  }
}

// Fonction pour ouvrir la connexion IndexedDB
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("authDB", 1);
    request.onerror = (event) => reject("Erreur d'ouverture d'IndexedDB");
    request.onsuccess = (event) => resolve(event.target.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("tokens")) {
        db.createObjectStore("tokens");
      }
    };
  });
}

export { authFetch, refreshAccessToken };
