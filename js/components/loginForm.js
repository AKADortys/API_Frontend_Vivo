import { login } from "../api/user.js";

// Initialisation des listeners sur le formulaire de connexion
export function loginFormListeners() {
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
      // Appel de la fonction login et réinitialisation du formulaire si succès
      await login(data);
      connect_form.reset();
    });
  }
  