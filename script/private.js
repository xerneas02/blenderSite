function getInfo() 
{
    $.ajax({
        url: '../htbin/getuser.py',
        type: 'GET',
        dataType: 'json',
    })
    .done(function( data ) {
        let user = data;
        div = document.getElementById("info");
        div.innerHTML =   "Pseudo : "            + user.username  + "<br/>"
                        + "Nom : "               + user.lastname  + "<br/>"
                        + "Prenom : "            + user.firstname + "<br/>"
                        + "Email : "             + user.useremail + "<br/>"
                        + "Pays : "              + user.user_pays + "<br/>"
                        + "Date de naissance : " + user.birthdate  + "<br/>";
    })
    .fail(function() {
        div = document.getElementById("info");
        div.textContent = "Vous n'êtes pas connécté!"; // there was an error, so display an error
    });
}

getInfo();





