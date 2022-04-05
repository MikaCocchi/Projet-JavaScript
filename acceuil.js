$(document).ready(function () {
    $.ajax({
        //L'URL de la requête 
        url: "https://api.spaceflightnewsapi.net/v3/articles",

        //La méthode d'envoi (type de requête)
        method: "GET",

        //Le format de réponse attendu
        dataType: "json",
    })
        //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
        /*On peut par exemple convertir cette réponse en chaine JSON et insérer
         * cette chaine quelque part*/
        .done(function (response) {
            console.log(response);
            if (response) {
                populateFeed(response);
            }
            function populateFeed(response) {
                for (let i = 0; i < response.length; i++) {
                    $('.posts').append('<div class="post"></div>');
                    $('.posts .post:last').html('<img src="' + response[i].imageUrl + '"alt="Picsum Image" class="image">');
                    $('.posts .post:last').prepend('<h3></h3>');
                    $('.posts .post:last h3').prepend(response[i].title);
                    $('.posts .post:last').append('<p></p>');
                    $('.posts .post:last p').append(response[i].summary);
                }
            }
        })



        //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
        //On peut afficher les informations relatives à la requête et à l'erreur
        .fail(function (error) {
            alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
        })

        //Ce code sera exécuté que la requête soit un succès ou un échec
        .always(function () {
            alert("Requête effectuée");
        });
});