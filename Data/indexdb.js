export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("database", 8);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      console.log("Mise à niveau de la base de données...");

      // Création des tables et des index
      const utilisateur = db.createObjectStore("utilisateurs", { keyPath: "id", autoIncrement: true });
      utilisateur.createIndex("nom", "nom", { unique: false });
      utilisateur.createIndex("mail", "mail", { unique: true });
      utilisateur.createIndex("prenom", "prenom", { unique: false });
      utilisateur.createIndex("phone", "phone", { unique: false });
      utilisateur.createIndex("createdAt", "createdAt", { unique: false });
      utilisateur.createIndex("updatedAt", "updatedAt", { unique: false });

      const produit = db.createObjectStore("produits", { keyPath: "id", autoIncrement: true });
      produit.createIndex("nom", "nom", { unique: false });
      produit.createIndex("prix", "prix", { unique: false });

      const panier = db.createObjectStore("panier", { keyPath: "id", autoIncrement: true });
      panier.createIndex("produit_id", "produit_id", { unique: false });
      panier.createIndex("quantite", "quantite", { unique: false });

      console.log("Tables et index créés avec succès.");
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      console.log("Base de données ouverte avec succès !");
      resolve(db); // Renvoie `db` pour un usage futur
    };

    request.onerror = function(event) {
      console.error("Erreur d'ouverture de la base de données", event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
}
