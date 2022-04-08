document.addEventListener('DOMContentLoaded', () => {
    let dropDownMenuButton = document.querySelector('.dropDownButton');
    
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
});

////drop down the menu
function dropDown() {
    document.getElementById('dropDownId').classList.add('show');
}