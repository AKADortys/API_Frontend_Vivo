import { authFetch } from '../MiddleWare/FetchAuto.js';

export async function ArticlesOrder() {
    try {
        const commande = JSON.parse(localStorage.getItem('order'));
        if (!commande) {
            console.error("Commande non trouvée dans localStorage.");
            throw new Error("Commande non trouvée.");
        }
        const options = { method: 'GET' };
        const response = await authFetch(`http://localhost:3000/ArticleOrder/article/${commande.id}`, options);

        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
        }

        const Article = await response.json();
        console.log(Article);
        return Article

    } catch (err) {
        console.error('Erreur lors de la récupération des articles de la commande :', err);
        return null;
    }
}
