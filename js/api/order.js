import { authFetch } from './auth.js';
import { AppStorage } from "../utils/storage.js";

// Récupère ou crée une commande pour l'utilisateur courant
export async function OrderGetOrCreate(id) {
    try {
        const options = { method: 'GET' };
        const response = await authFetch(`http://localhost:3000/order/current/${id}`, options);

        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
        }

        const order = await response.json();
        AppStorage.set('current_order',order)//stockage
        console.log("Commande trouvée !");
        return order;

    } catch (err) {
        console.error('Erreur lors de la récupération de la commande :', err);
        return null;
    }
}
