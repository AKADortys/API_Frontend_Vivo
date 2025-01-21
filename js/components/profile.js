import { AppDom } from "../utils/dom.js";
import { AppStorage } from "../utils/storage.js";
import { update } from "../api/user.js";

export function ProfileListener() {
  const profile = document.getElementById("profile");
  profile.addEventListener("click", async (e) => {
    if (e.target.id === "btn-logout") {
      AppStorage.clear();
      console.log("Déconnexion réussie!");
      await AppDom.CreateAlert("Vous êtes déconnecté!", "", "");
      document.getElementById("hidde_profile").style.display = "none";
      AppDom.init();
    }

    if (e.target.id === "btn-edit-profile") {
      const user = AppStorage.get("active_user");
      if (!user) {
        return AppDom.CreateAlert(
          "Vous n'êtes pas connecté(e)!",
          "Vous pouvez créer un compte via l'onglet Connexion",
          "warning"
        );
      }

      Swal.fire({
        title: "Mettez à jour votre profil",
        html: `
          <form id="form-alert">
            <input type="text" id="nom-updt" class="swal2-input" value="${user.nom}" placeholder="Entrez votre nom" />
            <input type="text" id="prenom-updt" class="swal2-input" value="${user.prenom}" placeholder="Entrez votre prénom" />
            <input type="email" id="email-updt" class="swal2-input" value="${user.mail}" placeholder="Entrez votre email" />
            <input type="text" id="phone-updt" class="swal2-input" value="${user.phone}" placeholder="Entrez votre numéro de téléphone" />
          </form>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Soumettre",
        preConfirm: async () => {
          const name = document.getElementById("nom-updt").value.trim();
          const prenom = document.getElementById("prenom-updt").value.trim();
          const email = document.getElementById("email-updt").value.trim();
          const phone = document.getElementById("phone-updt").value.trim();

          if (!name || !prenom || !email || !phone) {
            Swal.showValidationMessage("Tous les champs sont obligatoires.");
            return false;
          }

          if (!/^\S+@\S+\.\S+$/.test(email)) {
            Swal.showValidationMessage(
              "Veuillez entrer une adresse email valide."
            );
            return false;
          }

          return { nom: name, prenom, mail: email, phone, pwd: "" };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            console.log("Mise à jour du profil :", result.value);
            const success = await update(result.value); // Appel API pour mettre à jour
            if (success) {
              AppDom.displayProfile();
              AppDom.CreateAlert(
                "Profil mis à jour avec succès!",
                "",
                "success"
              );
            } else {
              AppDom.CreateAlert(
                "Une erreur est survenue lors de la mise à jour du profil!",
                "",
                "error"
              );
            }
          } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
          }
        }
      });
    }
  });
}
