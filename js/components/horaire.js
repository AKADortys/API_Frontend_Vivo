import { AppDom } from "../utils/dom.js";

export function horaireListeners() {
  // Horaires d'ouverture du magasin
  const horaires = {
    1: ["10:00-14:00", "15:30-18:00"], // Lundi
    2: ["10:00-14:00", "15:30-18:00"], // Mardi
    3: ["10:00-14:00", "15:30-18:00"], // Mercredi
    4: ["10:00-14:00", "15:30-18:00"], // Jeudi
    5: ["10:00-14:00", "15:30-18:00"], // Vendredi
    6: [], // Samedi (fermé)
    0: [], // Dimanche (fermé)
  };
  // Fonction pour vérifier si l'heure actuelle est dans une plage d'ouverture
  function confirmOpen(heureActuelle, plagesHoraires) {
    for (let horaire of plagesHoraires) {
      let [debut, fin] = horaire.split("-");
      debut = new Date(`1970-01-01T${debut}:00`);
      fin = new Date(`1970-01-01T${fin}:00`);

      if (heureActuelle >= debut && heureActuelle <= fin) {
        return true;
      }
    }
    return false;
  }

  // Fonction pour vérifier si le magasin est ouvert
  function checkOpen() {
    const maintenant = new Date();
    const jour = maintenant.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    function padZero(number) {
      return number < 10 ? "0" + number : number;
    }

    const heureActuelle = new Date(
      `1970-01-01T${padZero(maintenant.getHours())}:${padZero(maintenant.getMinutes())}:00`
    );

    const plagesHoraires = horaires[jour];

    if (plagesHoraires.length === 0) {
      return false; // Fermé
    }

    return confirmOpen(heureActuelle, plagesHoraires);
  }

  // Affichage du statut du magasin
  const statut = checkOpen()
    ? "<p>Le magasin est <span class='open'>ouvert</span>.</p>"
    : "<p>Le magasin est <span class='closed'>fermé</span></p>";

  AppDom.CreateAlert(
    checkOpen() ? "Le magasin est ouvert" : "Le magasin est fermé",
    "",
    "info"
  );
  document.getElementById("status").innerHTML = statut;

  // Mise à jour du statut toutes les minutes
  setInterval(() => {
    const statut = checkOpen()
      ? "<p>Le magasin est <span class='open'>ouvert</span>.</p>"
      : "<p>Le magasin est <span class='closed'>fermé</span></p>";
    document.getElementById("status").innerHTML = statut;
  }, 60000); // Mise à jour toutes les 60 secondes

  const hidde_horaire = document.getElementById("hidde_horaire");
  const status_div = document.getElementById("horaires-ouvertures");
  let statusIsOpen = false;

  hidde_horaire.addEventListener("click", function () {
    if (!statusIsOpen) {
      statusIsOpen = true;
      status_div.classList.add("open");
    } else {
      statusIsOpen = false;
      status_div.classList.remove("open");
    }
  });
}
