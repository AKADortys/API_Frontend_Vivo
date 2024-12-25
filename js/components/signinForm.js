import { register } from "../api/user.js";

export async function signinListeners() {
    const form = document.getElementById("Sign_In-form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const nom = document.getElementById("nom-signin").value.trim();
      const prenom = document.getElementById("prenom-signin").value.trim();
      const pwd = document.getElementById("mdp-signin").value;
      const mdpConfirm = document.getElementById("mdp_confirm-signin").value;
      const phone = document.getElementById("telephone-signin").value.trim();
      const mail = document.getElementById("mail-signin").value.trim();
  
      // Validation des champs
      let errors = [];
  
      if (nom === "") errors.push("Le nom est obligatoire.");
      if (prenom === "") errors.push("Le prénom est obligatoire.");
      if (pwd.length < 6)
        errors.push("Le mot de passe doit contenir au moins 6 caractères.");
      if (pwd !== mdpConfirm)
        errors.push("Les mots de passe ne correspondent pas.");
      if (!/^\d{10}$/.test(phone))
        errors.push("Le numéro de téléphone doit contenir 10 chiffres.");
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail))
        errors.push("L'adresse e-mail n'est pas valide.");
  
      // Affichage des erreurs ou envoi
      if (errors.length > 0) {
        alert("Erreurs:\n" + errors.join("\n"));
        return false;
      } else {
        const data = {
          nom :nom,
          prenom:prenom,
          pwd:pwd,
          phone:phone,
          mail: mail
        };
        register(data);
        form.reset()
      }
    });
  }
  