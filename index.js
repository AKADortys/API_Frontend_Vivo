import { initDB } from "./JS/indexdb.js";
import { loadPartials } from "./JS/fetch_html.js";
import { newsletterListener } from "./JS/newslettre.js";
import { headerListeners } from "./JS/header.js";
import { connectFormListeners } from "./JS/connect_user.js";
import { createUserListeners } from "./JS/create_user.js";
import { questionListener } from "./JS/question_form.js";
import { horaireListeners } from "./JS/ouverture.js";

document.addEventListener("DOMContentLoaded", () => {
  initDB(); // Initialise la base de données
  loadPartials(); // importe les partials html
  setTimeout(() => {
      newsletterListener(); // écoute les événements sur la newsletter
      headerListeners(); // écoute les événements sur le header
      connectFormListeners(); // écoute les événements sur le formulaire de connexion
      createUserListeners(); // écoute les événements sur le formulaire d'inscription
      questionListener(); // écoute les événements sur le formulaire de questionnaire
      horaireListeners(); // écoute les événements sur les horaires d'ouverture
  }, 200);
});
