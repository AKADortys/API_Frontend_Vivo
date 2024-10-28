import { initDB } from "./JS/indexdb.js";
import { loadPartials } from "./JS/fetch_html.js";
import { newsletterListener } from "./JS/newslettre.js";
import { headerListeners } from "./JS/header.js";
import { connectFormListeners } from "./JS/connect_user.js";
import { createUserListeners } from "./JS/create_user.js";
import { questionListener } from "./JS/question_form.js";
import { horaireListeners } from "./JS/ouverture.js";

document.addEventListener("DOMContentLoaded", async () => {
  try
  {
    const db = await initDB(); // Initialise la base de données
    await loadPartials(); // Charge les partials HTML
  
    // Une fois les partials chargés, ajouter les écouteurs
    newsletterListener();
    headerListeners();
    connectFormListeners();
    createUserListeners();
    questionListener();
    horaireListeners();
  }
  catch (error)
  {
    console.error("Une erreur est survenue :" + error.message);
  }
});
