export function displayArticle(data) {
    const section = document.getElementById('produit');

    let contentHTML = '';

    data.forEach(e => {
        if(e.available){
            contentHTML += `
                <div class="article-card">
                    <h3>${e.label}</h3>
                    <p>${e.content}</p>
                    <p>Prix : ${e.price} Euro</p>
                    <input type="number" id="article${e.id}">
                    <button class="btn" onclick="addToOrder(${e.id})">Ajouter au panier</button>
                </div>
            `;

        }
    });
    section.innerHTML = contentHTML;
}
