export function displayCurrentOrder(order, article)
{
    console.log(article.articleOrders)
    const panier = document.getElementById('panier');
    let innerhtml = 
    `<div>
    <h2>Votre panier</h2>
    <div>
    <p>${order.isConfirmed?"Confirmé":"Pas confirmé"}</p>
    <ul>`;
    article.articleOrders.forEach(prop =>innerhtml += `<li>${prop.label} : ${prop.quantity} X ${prop.price}</li>`)
    

    innerhtml +="</ul></div></div>";

    console.log(innerhtml);

    panier.innerHTML = innerhtml;
}