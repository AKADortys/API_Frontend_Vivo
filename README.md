# API Backend Documentation

## Description
Ce projet est une API backend développée avec le framework Express. L’API interagit avec une base de données MySQL et utilise des variables d’environnement pour la configuration. Elle permet de gérer des utilisateurs, des articles, et des processus d’authentification.

## Prérequis

- **Node.js** (version 14 ou ultérieure)
- **Serveur MySQL** fonctionnel
- **Fichier `.env`** configuré avec les informations suivantes :
  - `DB_HOST` : Adresse du serveur MySQL
  - `DB_USER` : Nom d'utilisateur de la base de données
  - `DB_PASSWORD` : Mot de passe de la base de données
  - `DB_NAME` : Nom de la base de données
  - `PORT` : Port d'exécution de l'application (par défaut : 3000)

## Installation

1. **Cloner le dépôt :**
   ```bash
   git clone <URL_du_dépôt>
   cd <nom_du_répertoire>
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement :**
   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez les configurations requises mentionnées ci-dessus.

4. **Configurer la base de données :**
   - Créez une base de données nommée comme configurée dans votre fichier `.env`.
   - Assurez-vous que le serveur MySQL est en cours d'exécution.

5. **Lancer l'application :**
   ```bash
   npm start
   ```

## Endpoints

### Gestion des utilisateurs
- **GET** `/user/getUser/:id?` : Récupérer un utilisateur par son ID
- **GET** `/user/getAll` : Récupérer tous les utilisateurs
- **PUT** `/user/updateUser/:id?` : Mettre à jour un utilisateur
- **DELETE** `/user/deleteUser/:id?` : Supprimer un utilisateur

### Authentification
- **POST** `/auth/register` : Créer un compte utilisateur
- **POST** `/auth/login` : Connexion d'un utilisateur
- **POST** `/auth/refresh` : Rafraîchir le token d'accès
- **POST** `/auth/logout` : Déconnexion d'un utilisateur

### Gestion des articles
- **GET** `/article/getArticle/:id?` : Récupérer un article par son ID
- **GET** `/article/getAll` : Récupérer tous les articles
- **POST** `/article/createArticle` : Créer un nouvel article
- **PUT** `/article/updateArticle/:id?` : Mettre à jour un article
- **DELETE** `/article/delete/:id?` : Supprimer un article


