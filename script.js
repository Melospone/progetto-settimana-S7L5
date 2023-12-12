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
                card.innerHTML += `<div class= "col-3 g-3">
            <div class = "card h-100 w-80 border-4 border-black">
            <img src="${product.imageUrl}" class="card-img-top h-100 w-150" alt=""/>
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

        
        fetch(url, { headers })
            .then((response) => response.json())
            .then((data) => {
                let card = document.getElementById("card");
                card.innerHTML = "";

                data.forEach((product) => {
                card.innerHTML +=     `<div class="card h-100 w-100">
                <img src="${product.imageUrl}" class="card-img-top object-fit-cover h-100 w-100" alt=""/>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <a class="btn btn-warning me-2 mb-1" href="./modifica.html" id="${product._id}">Modifica</a>
                    <a class="btn btn-info" href="detail.html?id=${product._id}">Scopri di più</a>
                </div>
            </div>
        </div>`
                });
            });

        
        window.location.href = "./index.html";
    } catch (error) {
        console.error(error);
    }
}


function resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productBrand").value = "";
    document.getElementById("imgPro").value = "";
}

function populateForm() {
    fetch(url, {headers})
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element) => {
            populateEditPage(element.name, element.brand, element.price, element.imageUrl, element.description);
        })});
    function populateEditPage(editName, editBrand, editPrice, editImage, editDescription) {
        document.getElementById("productName").value = editName;
        document.getElementById("productBrand").value = editBrand;
        document.getElementById("productPrice").value = editPrice;
        document.getElementById("imgPro").value = editImage;
        document.getElementById("productDescription").value = editDescription;
}
}
populateForm();







