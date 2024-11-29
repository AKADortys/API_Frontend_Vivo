import { initDB } from './indexdb.js';

export async function getArticles () {
    try {
        // Récupération des articles à partir du backend
        const response = await fetch('http://localhost:3000/article/getAll');
        const articles = await response.json();

        await storeArticlesInIndexedDB(articles);

        return articles;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        return [];  // Renvoie un tableau vide en cas d'erreur
    }
}

export async function storeArticlesInIndexedDB(articles) {
    try {
        const db = await initDB();
        const transaction = db.transaction("produits", "readwrite");
        const store = transaction.objectStore("produits");

        articles.forEach(article => {
            store.put({
                id: article.id,
                label: article.label,
                description: article.content,
                prix: article.price
            });
        });

        transaction.oncomplete = () => {
            console.log("Tous les articles ont été stockés avec succès dans IndexedDB");
        };

        transaction.onerror = (event) => {
            console.error("Erreur lors du stockage des articles", event.target.error);
        };
    } catch (error) {
        console.error("Erreur d'initialisation de la base de données : ", error);
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

