document.addEventListener('DOMContentLoaded', () => {
    let dropDownMenuButton = document.querySelector('.dropDownButton');
    let buttonLvl1 = document.querySelector('#buttonLvl1');
    let buttonLvl2 = document.querySelector('#buttonLvl2');
    let buttonLvl3 = document.querySelector('#buttonLvl3');
    dropDownMenuButton.addEventListener('click', function () {
        dropDown();
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
    buttonLvl1.addEventListener('click',function(){
        apiMemory('https://mocki.io/v1/86bc32a0-8170-4ca0-9d18-5ddb71ce37d6');
    });
    buttonLvl2.addEventListener('click',function(){
        apiMemory('https://mocki.io/v1/b1f75f87-296c-49d6-bc77-1e43390586ee');
    });
    buttonLvl3.addEventListener('click',function(){
        apiMemory('https://mocki.io/v1/c3538bfd-185c-478d-aae9-0e4bd146ec23');
    });
    
});

////drop down the menu
function dropDown() {
    document.getElementById('dropDownId').classList.add('show');
}
// API easy lvl LINK : https://mocki.io/v1/2657ac06-d741-482b-8296-887f2fc6c751
// API normal lvl LINK : https://mocki.io/v1/b1f75f87-296c-49d6-bc77-1e43390586ee
// API hard lvl LINK : https://mocki.io/v1/c3538bfd-185c-478d-aae9-0e4bd146ec23

function apiMemory(memoryLevelApiLink) {
    console.log('api link : ',typeof memoryLevelApiLink );
    fetch(memoryLevelApiLink)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log('json : ',json);
            populateMemory(json.UrlImages);
        })
        .catch((error) => {
            errorMessagePlace = document.querySelector('main');
            createErrorMessage(errorMessagePlace, 'il y a une erreur -_-');
        })
}
function populateMemory(imgUrls) {
    for (let i = 0; i < imgUrls.length; i++) {
        createPairOfCards(imgUrls[i])
    }
}
function createPairOfCards(carImageUrl) {
    memorySelector = document.querySelector('#memoryGame');
    for (let i = 0; i < 2; i++) {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('cardContainer');
        memorySelector.append(cardContainer);
        let createCardImg = document.createElement('img');
        createCardImg.src = carImageUrl;
        createCardImg.classList.add('cardFront');
        cardContainer.append(createCardImg);
        let createBackCard = document.createElement('div');
        createBackCard.classList.add('cardBack','show');
        cardContainer.append(createBackCard);
        //flip cards on click
        cardContainer.addEventListener('click', function(){
            createCardImg.classList.toggle('show')
            createBackCard.classList.toggle('show')
        })
    }
}
function createErrorMessage(errorMessagePlace, errorMessage) {
    let errorMessageTag = document.createElement('h2')
    errorMessageTag.textContent = errorMessage;
    errorMessagePlace.append(errorMessageTag);
    setTimeout(() => { errorMessageTag.remove(); errorMessageAlreadyWritten = false; }, 5000);
}