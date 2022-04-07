////rop down the menu
function dropDown() {
    document.getElementById('dropDownId').classList.add('show');
}

/////close the Menu if the user clicks somewhere else
window.onclick = function (event) {
    if (!event.target.matches('.dropDownButton')) {
        let dropdowns = document.getElementsByClassName("dropDownItems");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
let alreadyClicked = false;
function apiFeed() {
    if (!alreadyClicked) {
        fetch('https://api.spaceflightnewsapi.net/v3/articles')
            .then(response => {
                return response.json();
            })
            .then(json => {
                populateFeed(json);
                alreadyClicked = true;
            })
            .catch((error) => {
                errorMessage();
            })
    } else {
        alreadyClickedMessage();
    }
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
    let selecteur = document.querySelector('.posts')
    let errorMessage = document.createElement('h2')
    errorMessage.textContent = "La requête a échouée °v°";
    selecteur.prepend(errorMessage);
    setTimeout(() => { errorMessage.remove(); }, 2000);
}
function alreadyClickedMessage() {
    let selecteur = document.querySelector('.posts')
    let alreadyClickedMessage = document.createElement('h2')
    alreadyClickedMessage.textContent = "tu es déjà à jour petit chenapant";
    selecteur.prepend(alreadyClickedMessage);
    setTimeout(() => { alreadyClickedMessage.remove(); }, 2000);
}