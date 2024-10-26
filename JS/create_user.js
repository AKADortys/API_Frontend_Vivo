    // Gestionnaire de formulaire de connexion
    const form = document.getElementById('Sign_In-form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const nom = document.getElementById('nom-signin').value.trim();
      const prenom = document.getElementById('prenom-signin').value.trim();
      const mdp = document.getElementById('mdp-signin').value;
      const mdpConfirm = document.getElementById('mdp_confirm-signin').value;
      const telephone = document.getElementById('telephone-signin').value.trim();
      const email = document.getElementById('mail-signin').value.trim();
        
      console.log(nom, prenom, mdp, mdpConfirm)
      // Validation des champs
      let errors = [];
  
      if (nom === "") errors.push("Le nom est obligatoire.");
      if (prenom === "") errors.push("Le prénom est obligatoire.");
      if (mdp.length < 6) errors.push("Le mot de passe doit contenir au moins 6 caractères.");
      if (mdp !== mdpConfirm) errors.push("Les mots de passe ne correspondent pas.");
      if (!/^\d{10}$/.test(telephone)) errors.push("Le numéro de téléphone doit contenir 10 chiffres.");
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.push("L'adresse e-mail n'est pas valide.");
  
      // Affichage des erreurs ou envoi
      if (errors.length > 0) {
        alert("Erreurs:\n" + errors.join("\n"));
        return false;
      } else {

        alert("création de compte indisponible ");

      //   const data = {
      //     nom,
      //     prenom,
      //     mdp,
      //     telephone,
      //     email
      //   };
  
      //   fetch('', { 
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(data)
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Réussie:', data);
      //     form.reset();
      //     alert("Votre inscription est validée!");
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
  }
    });

  