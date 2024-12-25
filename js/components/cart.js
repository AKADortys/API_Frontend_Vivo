import { ArticlesOrder,addArticleToOrder } from "../api/panier.js";
import { AppDom } from "../utils/dom.js";


export function articlesListener() {
    const articlesBtn = document.querySelectorAll(".btn");
    articlesBtn.forEach((btn) => {
        const id = btn.getAttribute("data-article-id");
        btn.addEventListener("click", async function () {
            try {
                const quantityInput = document.getElementById(`article${id}`);
                const quantity = parseInt(quantityInput.value);
                
                if (isNaN(quantity) || quantity <= 0 || quantity > 15) {
                    console.error("Quantité invalide ou hors limite !");
                    alert("Veuillez entrer une quantité valide (entre 1 et 15).");
                    return;
                }

                await addArticleToOrder(id, quantity);
                await ArticlesOrder();
                await AppDom.displayCart();
                articlesListener(); // Réattacher les écouteurs
                console.log(`Article ${id} ajouté au panier avec ${quantity} exemplaires`);
                quantityInput.value = 0;
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'article au panier :", error);
                alert("Une erreur est survenue lors de l'ajout au panier.");
            }
        });
    });
}
