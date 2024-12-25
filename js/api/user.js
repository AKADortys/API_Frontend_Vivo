import { OrderGetOrCreate } from "./order.js";
import { AppStorage } from "../utils/storage.js";
import { ArticlesOrder } from "./panier.js";
import { AppDom } from "../utils/dom.js";

export async function login(data){
    try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
  
        const result = await response.json();
  
        if (result.success) {
          // Stockage des informations utilisateur et token
          AppStorage.set("active_user", result.user);
          AppStorage.set("Token", result.user.accessToken);

          //recup de la commande actuelle
          const order = await OrderGetOrCreate(result.user.id_user);
          AppStorage.set("current_order", order);
          await ArticlesOrder();
            AppDom.displayCart();
            console.log('Commande trouvé à la connexion')
          
        }
      } catch (error) {
        console.error("Une erreur est survenue :", error);
        alert("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
      }
}

export async function register(data){
        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
            }
            return response.json();
          })
          .then(data => {
            console.log('Réussie:', data);
            alert("Votre inscription est validée!");
          })
          .catch(error => {
            console.error('Error:', error);
            alert("Une erreur est survenue : " + error.message);
          });
}