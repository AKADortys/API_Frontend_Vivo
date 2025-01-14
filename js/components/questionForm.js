// fonction pour initialiser l'écouteurs du fomulaire de question
export function questionFormListener() {
  const question_form = document.getElementById("Form_question");

  question_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = document.getElementById("question-nom").value;
    const prenom = document.getElementById("question-prenom").value;
    const question = document.getElementById("question").value;

    let errors = [];

    //validation des champs
    if (nom === "" || prenom === "" || question === "")
      errors.push("Tout les champs ont besoin d'être remplis");
    if (!prenom || !nom || !question)
      errors.push("Tout les champs ont besoin d'être remplis");

    if (errors.length > 0) {
      Swal.fire("Erreurs:\n" + errors.join("\n"));
      return false;
    } else {
      Swal.fire(`Merci ${prenom} ${nom} pour votre question : ${question}`);
      question_form.reset();
      //Ajouter le code plus tard
    }
  });
}
