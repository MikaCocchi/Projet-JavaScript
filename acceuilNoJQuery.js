let alreadyClicked = false;

document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('#newPostForm');
    let submit = document.querySelector('#submit');
    let updateFeed = document.querySelector('.update');
    let dropDownMenuButton = document.querySelector('.dropDownButton');

    dropDownMenuButton.addEventListener('click', function () {
        dropDown();
    });

    submit.addEventListener('click', function (event) {
        event.preventDefault();
        if (form.checkValidity()) {
            let formInfo = createFormInfosArray();
            makeOneArticle(formInfo);
        }
    });
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
    };

    updateFeed.addEventListener('click', function () {
        apiFeed();
    })
});







////////////////////FUNCTIONS////////////////////

////rop down the menu
function dropDown() {
    document.getElementById('dropDownId').classList.add('show');
}



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

//CREATE ARTICLES
function populateFeed(allArticles) {
    for (let i = 0; i < allArticles.length; i++) {
        makeOneArticle(allArticles[i]);
    }
}

//CREATE ONE SINGLE ARTICLE
function makeOneArticle(article) {
    ///////////////the div which contains the post informations///////////////
    let selecteur = document.querySelector('.posts');
    let createDiv = document.createElement('div');
    createDiv.classList.add("post");
    selecteur.append(createDiv)
    ////////create H3///////////
    let createH3 = document.createElement('h3');
    createH3.textContent = article.title;
    createDiv.append(createH3);
    ////////create IMG//////////
    let createImg = document.createElement('img');
    createImg.src = article.imageUrl;
    createImg.classList.add("image");
    createDiv.append(createImg);
    ////////create P////////////
    let createP = document.createElement('p');
    createP.textContent = article.summary;
    createDiv.append(createP);
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

function createFormInfosArray() {
    let formInfos = {
        'title': document.querySelector('#titleForm').value,
        'imageUrl': document.querySelector('#imgForm').value,
        'summary': document.querySelector('#contentForm').value,
    }
    return formInfos;
}