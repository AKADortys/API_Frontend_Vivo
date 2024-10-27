let db;
const request = indexedDB.open("database", 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  const utilisateur = db.createObjectStore("utilisateurs", { keyPath: "id", autoIncrement: true });
  utilisateur.createIndex("password", "password", { unique: false });
  utilisateur.createIndex("email", "email", { unique: true });

  const produit = db.createObjectStore("produits", { keyPath: "id", autoIncrement: true });
  produit.createIndex("nom", "nom", { unique: false });
  produit.createIndex("prix", "prix", { unique: false });
  produit.createIndex("quantite", "quantite", { unique: false });

  const panier = db.createObjectStore("panier", { keyPath: "id", autoIncrement: true });
  panier.createIndex("produit_id", "produit_id", { unique: false });
  panier.createIndex("quantite", "quantite", { unique: false });
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("Base de données ouverte avec succès !");
};

request.onerror = function(event) {
  console.error("Erreur d'ouverture de la base de données", event.target.errorCode);
};
