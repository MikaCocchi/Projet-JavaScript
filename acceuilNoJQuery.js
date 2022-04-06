function apiFeed() {
fetch('https://api.spaceflightnewsapi.net/v3/articles')
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(json => {
        populateFeed(json);
        console.log(json)

    })
    .catch((error) => {
        errorMessage();
    })
}



function populateFeed(response) {
    for (let i = 0; i < response.length; i++) {
        ///////////////the div which contains the post informations///////////////
        let selecteur = document.querySelector('.posts');
        let createDiv = document.createElement('div');
        createDiv.classList.add("post");
        selecteur.append(createDiv)
        ////////create H3///////////
        let createH3 = document.createElement('h3');
        createH3.textContent = response[i].title;
        createDiv.append(createH3);
        ////////create IMG//////////
        let createImg = document.createElement('img');
        createImg.src = response[i].imageUrl;
        createImg.classList.add("image");
        createDiv.append(createImg);
        ////////create P////////////
        let createP = document.createElement('p');
        createP.textContent = response[i].summary;
        createDiv.append(createP);

    }
}

function errorMessage() {
    let errorMessage = document.createElement('h2')
    errorMessage.innerText = "La requête a échouée °v°";
    document.body.prepend(errorMessage);
    console.log("il y a une erreur");
    setTimeout(() => { errorMessage.remove(); }, 2000);
}