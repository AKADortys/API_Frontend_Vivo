import { authFetch } from '../MiddleWare/FetchAuto.js';

export async function OrderGetOrCreate(id) {
    try {
        const options = { method: 'GET' };
        const response = await authFetch(`http://localhost:3000/order/current/${id}`, options);

        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
        }

        const order = await response.json(); // Ajoute await pour extraire la réponse JSON
        localStorage.setItem('order', JSON.stringify(order.order))
        console.log("Commande trouvée !");
        return order;

    } catch (err) {
        console.error('Erreur lors de la récupération de la commande :', err);
        return null; // Retourne null pour une gestion plus propre des erreurs
    }
}
