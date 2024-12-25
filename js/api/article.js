import { AppStorage } from "../utils/storage.js";

export async function getArticles () {
    try {
        // Récupération des articles à partir du backend
        const response = await fetch('http://localhost:3000/article/getAll');
        const articles = await response.json();
        AppStorage.set('articles', articles);  // Stocke les articles dans le stockage local

        return articles;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        return [];  // Renvoie un tableau vide en cas d'erreur
    }
}


export async function getArticle(id) {
    try{
        return await fetch(`http://localhost:3000/article/getArticle/${id}`)
       .then(response => response.json())
       .then(article => article);
    }catch(error){
        console.error('Erreur lors de la récupération de l\'article:', error);
        return null;
    }
}

