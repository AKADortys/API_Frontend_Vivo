# Gestion de Commande - Service Traiteur

Ce projet est une application web permettant aux clients d'un service traiteur de gérer leurs commandes via une interface utilisateur intuitive. L'application est une SPA (Single Page Application) qui communique avec une API backend pour traiter les données.

---

## Architecture du projet

```
project/
│
├── assets/              # Contient les ressources statiques (images, polices, etc.)
│   ├── css/             # Fichiers CSS
│   ├── images/          # Images utilisées dans le projet
│
├── js/                  # Scripts JavaScript
│   ├── api/             # Gestion des appels à l'API backend
│   │   ├── http.js      # Module pour effectuer les requêtes fetch
│   │   └── endpoints.js # Points de terminaison de l'API
│   ├── components/      # Scripts spécifiques aux partials
│   ├── utils/           # Fonctions utilitaires
│   │   ├── dom.js       # Fonctions pour manipuler le DOM
│   │   └── storage.js   # Fonctions pour gérer le localStorage
│   └── index.js         # Script principal pour initialiser l'application
│
├── partials/            # Fragments HTML pour la SPA
│
├── index.html           # Page principale de l'application
├── package.json         # Configuration NPM (si une bibliothèque est nécessaire)
├── README.md            # Documentation du projet
└── .gitignore           # Fichiers à ignorer par Git
```

---

## Fonctionnalités principales

- **Gestion des commandes** : Les clients peuvent passer des commandes directement depuis l'application.
- **Intégration avec l'API backend** : Toutes les données sont synchronisées avec une API backend qui gère les commandes et la base de données.
- **Interface utilisateur réactive** : Basée sur des partials pour une navigation fluide sans rechargement de page.
- **Gestion des erreurs** : Utilisation de SweetAlert2 pour afficher des alertes et des notifications personnalisées.

---

## Configuration du projet

### Prérequis
- Node.js et npm installés sur votre machine.

### Installation
1. Clonez le projet :
   ```bash
   git clone <URL_repo>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```

### Lancement de l'application
1. Ouvrez le fichier `index.html` avec live server pour démarrer l'application.

---

## Utilisation

### Configuration des requêtes
Le fichier `endpoints.js` contient tous les points de terminaison nécessaires pour communiquer avec l'API backend. Voici un exemple de configuration :
```javascript
const BASE_URL = 'https://example.com/api';

export const endpoints = {
  getOrders: `${BASE_URL}/orders`,
  createOrder: `${BASE_URL}/orders/create`,
  deleteOrder: `${BASE_URL}/orders/delete`,
};
```


---

## Dépendances
- **[SweetAlert2](https://sweetalert2.github.io/)** : Pour les alertes et les notifications.

---

## API Backend
Ce projet communique avec une API backend qui gère la base de données et les opérations liées aux commandes. Pour plus de détails, consultez le dépôt du backend :
[API Backend Vivo](https://github.com/AKADortys/API_backend_Vivo)


