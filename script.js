const url = "https://striveschool-api.herokuapp.com/api/product/"

const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4Mjc3MWMwNTgzNTAwMTg1MjJjZWMiLCJpYXQiOjE3MDIzNzMzNDQsImV4cCI6MTcwMzU4Mjk0NH0.1b-vPzyXta4q368JS2BzhdK4A2Yw_ynv8qZLmAwVjOA"
}

/* chiamata all'api delle card prodotti */
window.onload = function () {
    fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
            let card = document.getElementById("card");
            card.innerHTML = "";

            data.forEach((product) => {
                card.innerHTML += `<div class= "col">
            <div class = "card">
            <img src="${product.imageUrl}" class="card-img-top" alt=""/>
            <div class = "card-body">
            <h5 class = "card-title">${product.name}</h5>
            <p class = "card-text">${product.description}</p>
            <a class="btn btn-warning me-2 mb-1" href="./modifica.html" id="${product._id}">Modifica</a>
            <a class = "btn btn-info" href="detail.html? id=${product._id}">Scopri di più</a>
            </div>
            </div>
            </div>`
            })
        })
}

/* function updateProduct(_id) {
    const updatedName = prompt("Inserisci il nuovo nome del prodotto:");
    const updatedDescription = prompt("Inserisci la nuova descrizione del prodotto:");

    if (updatedName && updatedDescription) {
        // Esegui una richiesta PUT al tuo backend per aggiornare il prodotto con l'ID specificato
        fetch(`${url}/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: headers.Authorization,
            },
            body: JSON.stringify({
                name: updatedName,
                description: updatedDescription,
                // Aggiungi altri campi del prodotto se necessario
            }),
        })
        .then((response) => response.json())
        .then((updatedProduct) => {
            console.log('Prodotto aggiornato:', updatedProduct);
        
            // Aggiorna l'elemento card sulla pagina con i nuovi dati
            const cardToUpdate = document.querySelector(`[data-product-id="${_id}"]`);
            if (cardToUpdate) {
                const cardTitle = cardToUpdate.querySelector('.card-title');
                const cardDescription = cardToUpdate.querySelector('.card-text');
        
                if (cardTitle && cardDescription) {
                    cardTitle.textContent = updatedProduct.name;
                    cardDescription.textContent = updatedProduct.description;
                }
            }
        })
        .catch((error) => {
            console.error('Errore durante l\'aggiornamento del prodotto:', error);
        });
    } else {
        alert("Nome e descrizione sono obbligatori.");
    }
} */


/* chiamata per aggiungere un nuovo prodotto */

async function addProduct() {
    const objName = document.getElementById("productName").value;
    const objDescription = document.getElementById("productDescription").value;
    const objPrice = document.getElementById("productPrice").value;
    const objBrand = document.getElementById("productBrand").value;
    const objImg = document.getElementById("imgPro").value;

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: headers.Authorization,
            },
            body: JSON.stringify({
                "name": `${objName}`,
                "description": `${objDescription}`,
                "price": `${objPrice}`,
                "brand": `${objBrand}`,
                "imageUrl": `${objImg}`,
            }),
        });

        let data = await response.json();
        console.log(data);

        // Effettua una nuova richiesta per ottenere l'elenco aggiornato dei prodotti
        fetch(url, { headers })
            .then((response) => response.json())
            .then((data) => {
                let card = document.getElementById("card");
                card.innerHTML = "";

                data.forEach((product) => {
                card.innerHTML += `<div class= "col">
            <div class = "card">
            <img src="${product.imageUrl}" class="card-img-top" alt=""/>
            <div class = "card-body">
            <h5 class = "card-title">${product.name}</h5>
            <p class = "card-text">${product.description}</p>
            <a class="btn btn-warning me-2 mb-1" href="./modifica.html" id="${product._id}">Modifica</a>
            <a class = "btn btn-info" href="detail.html? id=${product._id}">Scopri di più</a>
            </div>
            </div>
            </div>`
                });
            });

        // Reindirizza all'index.html o dove desideri
        window.location.href = "./index.html";
    } catch (error) {
        console.error(error);
    }
}
