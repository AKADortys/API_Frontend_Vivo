export function displayCurrentOrder(data)
{
    const panier = document.getElementById('panier');
    let innerhtml = 
    `<div>
    <h2>Votre panier</h2>
    <div>
    <p>${data.isConfirmed?"Confirmé":"Pas confirmé"}</p>
    </div>
    </div>`;

    panier.innerHTML = innerhtml;
}