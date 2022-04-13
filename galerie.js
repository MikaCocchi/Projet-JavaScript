let formAlreadyExists = false;
let errorMessageAlreadyWritten = false;
document.addEventListener('DOMContentLoaded', () => {
    let dropDownMenuButton = document.querySelector('.dropDownButton');
    let mosaicDisplayButton = document.querySelector('#mosaicDisplayButton');
    let columnDisplayButton = document.querySelector('#columnDisplayButton');


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
    mosaicDisplayButton.addEventListener('click', function () {
        changeDisplayGallery('mosaic', 'column')
    });
    columnDisplayButton.addEventListener('click', function () {
        changeDisplayGallery('column', 'mosaic')
    });
    addImgFormsubmit.addEventListener('click', function (event) {
        event.preventDefault();
        let numberOfImgToAdd = document.querySelector('.formSelect').value
        if (!formAlreadyExists && numberOfImgToAdd !== '') {
            createAddImgForm(numberOfImgToAdd);
            addImg(numberOfImgToAdd);
        }
    });
});

////////////////////FUNCTIONS////////////////////

//drop down the menu
function dropDown() {
    document.getElementById('dropDownId').classList.add('show');
}
//change the display of the gallery 
function changeDisplayGallery(displayChoise, actualDisplay) {
    test = actualDisplay + 'DisplayItem';
    let galleryItems = document.querySelectorAll('.' + actualDisplay + 'DisplayItem');
    let galleryImages = document.querySelectorAll('.' + actualDisplay + 'DisplayImage');
    for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].classList.replace(actualDisplay + 'DisplayItem', displayChoise + 'DisplayItem');
    }
    for (let i = 0; i < galleryImages.length; i++) {
        galleryImages[i].classList.replace(actualDisplay + 'DisplayImage', displayChoise + 'DisplayImage');
    }
    selectedButtonDisplayChoice(displayChoise, actualDisplay);
}
//when the button is used it changes its background color
function selectedButtonDisplayChoice(displayChoise, actualDisplay) {
    let displayButtonPressed = document.querySelector('#' + displayChoise + 'DisplayButton');
    let displayButtonNotPressed = document.querySelector('#' + actualDisplay + 'DisplayButton');
    displayButtonPressed.classList.add('selected');
    displayButtonNotPressed.classList.remove('selected')
}

function createAddImgForm(numberOfImgToAdd) {
    if (numberOfImgToAdd !== 0) {
        let form = document.querySelector('.form');
        console.log('COMBIEN ?! ', numberOfImgToAdd);
        //div URL Form
        let divURLForm = document.createElement('div');
        divURLForm.classList.add('URLForm');
        form.append(divURLForm)
        //title
        let h3Form = document.createElement('h3');
        h3Form.textContent = 'URL d\'images';
        divURLForm.append(h3Form);

        //inputs
        for (let i = 0; i < numberOfImgToAdd; i++) {
            let input = document.createElement('input')
            input.setAttribute('type', 'text')
            input.setAttribute('id', 'input' + i)
            input.setAttribute('placeholder', 'URL de l\'image')
            divURLForm.append(input)
        }

        let addImgSubmit = document.createElement('button');
        addImgSubmit.textContent = 'valider';
        addImgSubmit.setAttribute('type', 'submit');
        addImgSubmit.setAttribute('id', 'addImgSubmit');
        divURLForm.append(addImgSubmit)
    }
    formAlreadyExists = true;
}

function addImg(numberOfImgToAdd) {
    let addImgSubmit = document.querySelector('#addImgSubmit');

    let galleryChild = document.querySelector('.gallery').firstElementChild;
    actualDivDisplay = galleryChild.className;
    let galleryImages = document.querySelector('.' + actualDivDisplay + ' img')
    actualImgDisplay = galleryImages.className;


    addImgSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        let gallery = document.querySelector('.gallery');
        let formIsCorrect = true;
        
        for (let i = 0; i < numberOfImgToAdd; i++) {
            regexUrl = /[(http(s)?):\/\/(www\.)?\w-/=#%&\.\?]{2,}\.[a-z]{2,}([\w-/=#%&\.\?]*)/gi;
            let urlInput = document.querySelector('#input' + i).value;
            if (!regexUrl.test(urlInput)) {
                formIsCorrect = false;
                errorMessagePlace = document.querySelector('#addImg');
                createErrorMessage(errorMessagePlace, 'mauvaise Url / champs non renseignés');
                break;
            }
        }
        if(formIsCorrect){
            for (let i = 0; i < numberOfImgToAdd; i++) {
                ////////create div//////////
                let createDiv = document.createElement('div');
                createDiv.classList.add(actualDivDisplay);
                gallery.prepend(createDiv);
                ////////create IMG//////////
                let createImg = document.createElement('img');
                createImg.src = document.querySelector('#input' + i).value;
                createImg.classList.add(actualImgDisplay);
                createDiv.prepend(createImg);
            }
            deleteForm();
            formAlreadyExists = false;
        }
    });
}
function deleteForm() {
    let URLForm = document.querySelector('.URLForm');
    URLForm.remove();
}
// parameters are the selector wich concerns the place of the error message and the message you want to display
function createErrorMessage(errorMessagePlace, errorMessage) {
    let errorMessageTag = document.createElement('h2')
    errorMessageTag.textContent = errorMessage;
    errorMessagePlace.append(errorMessageTag);
    setTimeout(() => { errorMessageTag.remove(); errorMessageAlreadyWritten = false; }, 2000);
}