const connect_form = document.getElementById("connect_form");

connect_form.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("mdp").value;

    let errors = [];

    if (email === "") errors.push("L'email est obligatoire.");
    if (password === "") errors.push("Le mot de passe est obligatoire.");
    if (password.length < 6) errors.push("Le mot de passe doit contenir au moins 6 caractères.");
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.push("L'adresse e-mail n'est pas valide.");

    if (errors.length > 0) {
        alert("Erreurs:\n" + errors.join("\n"));
        return false;
    } else{
        const data = {
            email,
            password
        }
        console.log("Connection indisponible pour le moment");
        // fetch('',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response=>response.json())
        // .then(data=>{
        //     console.log(data)
        // alert("Connexion réussie!")
        // })
        // .catch(error=>console.error(error))
        
    }
});