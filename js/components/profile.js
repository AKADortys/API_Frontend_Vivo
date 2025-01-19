import { AppDom } from "../utils/dom.js";
import { AppStorage } from "../utils/storage.js";

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
    if (e.target.id == "btn-edit-profile") {
      const user = AppStorage.get("active_user");
      if (!user)
        return AppDom.CreateAlert(
          "Vous n'êtes pas connecté(e)!",
          "vous pouvez créer un compte via l'onglet Connection",
          "warning"
        );
      console.log("salut");
    }
  });
}
