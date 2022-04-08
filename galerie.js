document.addEventListener('DOMContentLoaded', () => {
    let dropDownMenuButton = document.querySelector('.dropDownButton');
    let mosaicDisplayButton = document.querySelector('#mosaicDisplayButton')
    let columnDisplayButton = document.querySelector('#columnDisplayButton')

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
    })
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