import {OrderGetOrCreate}  from "../Data/orderGet.js";
import {displayCurrentOrder} from "../Partials/panier-section.js";

export function connectFormListeners() {
  const connect_form = document.getElementById("connect_form");

  connect_form.addEventListener("submit", function (event) {
    event.preventDefault();
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("mdp").value;

    let errors = [];

    if (mail === "") errors.push("L'email est obligatoire.");
    if (password === "") errors.push("Le mot de passe est obligatoire.");
    if (password.length < 6)
      errors.push("Le mot de passe doit contenir au moins 6 caractères.");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail))
      errors.push("L'adresse e-mail n'est pas valide.");

    if (errors.length > 0) {
      alert("Erreurs:\n" + errors.join("\n"));
      return false;
    } else {
      const data = { mail: mail, pwd: password };

      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Si la connexion est réussie
            document.getElementById("active_user").style.display = "block";
            document.querySelector('li[data-section="connexion"]').style.display = "none";
            localStorage.setItem("active_user", JSON.stringify(data.user));
            localStorage.setItem("Token", JSON.stringify(data.user.accessToken));
            const panier = OrderGetOrCreate(data.user.id_user);
            displayCurrentOrder(panier);
          } else {
            alert("Erreur de connexion : " + data.message);
          }
          this.reset();
        })
        .catch((error) => console.error(error));
    }
  });
}
