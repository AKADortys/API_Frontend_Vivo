import { OrderGetOrCreate } from "../Data/orderGet.js";
import { displayCurrentOrder } from "../Partials/panier-section.js";
import { ArticlesOrder } from "../Data/articleOrder.js";

export function connectFormListeners() {
  const connect_form = document.getElementById("connect_form");

  connect_form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const mail = document.getElementById("mail").value;
    const password = document.getElementById("mdp").value;

    let errors = [];

    // Validation des champs
    if (mail === "") errors.push("L'email est obligatoire.");
    if (password === "") errors.push("Le mot de passe est obligatoire.");
    if (password.length < 6)
      errors.push("Le mot de passe doit contenir au moins 6 caractères.");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail))
      errors.push("L'adresse e-mail n'est pas valide.");

    if (errors.length > 0) {
      alert("Erreurs:\n" + errors.join("\n"));
      return false;
    }

    const data = { mail: mail, pwd: password };

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
        // Connexion réussie
        document.getElementById("active_user").style.display = "block";
        document.querySelector('li[data-section="connexion"]').style.display =
          "none";

        // Stockage des informations utilisateur et token
        localStorage.setItem("active_user", JSON.stringify(result.user));
        localStorage.setItem("Token", JSON.stringify(result.user.accessToken));

        // Récupération du panier et des articles de manière asynchrone
        const panier = await OrderGetOrCreate(result.user.id_user);
        const articles = await ArticlesOrder();

        // Affichage du panier
        displayCurrentOrder(panier, articles);
        console.log("Affichage du panier terminé.");
      } else {
        alert("Erreur de connexion : " + result.message);
      }

      // Réinitialisation du formulaire
      connect_form.reset();
    } catch (error) {
      console.error("Une erreur est survenue :", error);
      alert("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    }
  });
}
