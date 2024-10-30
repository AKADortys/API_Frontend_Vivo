import { initDB } from './indexdb.js';

export function connectFormListeners() {
    const connect_form = document.getElementById("connect_form");

    connect_form.addEventListener("submit", function(event) {
        event.preventDefault();
        const mail = document.getElementById("mail").value;
        const password = document.getElementById("mdp").value;

        let errors = [];

        if (mail === "") errors.push("L'email est obligatoire.");
        if (password === "") errors.push("Le mot de passe est obligatoire.");
        if (password.length < 6) errors.push("Le mot de passe doit contenir au moins 6 caractères.");
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail)) errors.push("L'adresse e-mail n'est pas valide.");

        if (errors.length > 0) {
            alert("Erreurs:\n" + errors.join("\n"));
            return false;
        } else {
            const data = { mail: mail, pwd: password };

            fetch('http://localhost:3000/user/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {  // Si la connexion est réussie
                    console.log(data.utilisateur)
                    storeUserData(data.utilisateur);  // Stockage dans IndexedDB
                } else {
                    alert("Erreur de connexion : " + data.message);
                }
                this.reset();
            })
            .catch(error => console.error(error));
        }
    });
}
async function storeUserData(user) {
    try {
        const db = await initDB();
        const transaction = db.transaction("utilisateurs", "readwrite");
        const store = transaction.objectStore("utilisateurs");

        await store.put({
            id: user.id_user,
            nom: user.nom,
            prenom: user.prenom,
            mail: user.mail,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });

        transaction.oncomplete = () => {
            console.log("Utilisateur stocké avec succès dans IndexedDB");
        };

        transaction.onerror = (event) => {
            console.error("Erreur lors du stockage de l'utilisateur", event.target.error);
        };
    } catch (error) {
        console.error("Erreur d'initialisation de la base de données : ", error);
    }
}
