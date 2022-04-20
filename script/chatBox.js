let liste;
let oldListe;

function tableInputKeyPress(e){
    e=e||window.event;
    var key = e.keyCode;
    if(key==13) //Enter
    {
        let msg = 
        {
            "num": 0,
            "msg": $('#msg').val()
        }
        $.ajax({
            url : "../htbin/chatsend.py", // on donne l'URL du fichier de traitement
            type : "GET", // la requête est de type POST
            dataType: 'json',
            contentType: "application/json",
            data: msg
        });
        document.getElementById("msg").value = "";
        getInfo();
        gotoBottom("chatBox");
       return false; //return true to submit, false to do nothing
    }
  }

$('#send').click(function(e)
{
    e.preventDefault(); // on empêche le bouton d'envoyer le formulaire
    let msg = 
    {
        "num": 0,
        "msg": $('#msg').val()
    }
    $.ajax({
        url : "../htbin/chatsend.py", // on donne l'URL du fichier de traitement
        type : "GET", // la requête est de type POST
        dataType: 'json',
        contentType: "application/json",
        data: msg
    });
    document.getElementById("msg").value = "";
    getInfo();
    gotoBottom("chatBox");
});

function getInfo() 
{
    $.ajax({
        url: '../htbin/chatget.py',
        type: 'GET',
        dataType: 'json',
    })
    .done(function( data ) {
        liste = data;
        drawMessage();
    })
    .fail(function() {
        $('#chatBox').prepend('Error retrieving new messages..'); // there was an error, so display an error
    });
}

function drawMessage()
{
    if (oldListe == null)
    {
        for(let i = 0; i < liste.length; i++)
        {
            let date = new Date();
            let day = date.getDate();
            let mounth = date.getMonth()+1;
            mounth = (mounth < 10) ? "0" + mounth : mounth;
            let year = date.getFullYear(); year = year-2000;
            let date2 = day + "/" + mounth + "/" + year;
            let message = liste[i];
            let dater = message.date;
            let div = document.createElement("div");
            let name = message.user;
            if(date2 != dater)
                div.innerHTML = message.date + " " + name.bold() + ": " + message.msg;
            else
                div.innerHTML = message.time + " " + name.bold() + ": " + message.msg;
            div.classList.add("chatBoxMsg");
            document.getElementById("chatBox").appendChild(div);
        }
        oldListe = liste;
    }
    else if(oldListe != liste)
    {
        oldListe = liste;
        let message = oldListe[oldListe.length-1];
        let div = document.createElement("div");
        div.innerHTML = message.time + " " + (message.user).bold() + ": " + message.msg;
        div.classList.add("chatBoxMsg");
        document.getElementById("chatBox").appendChild(div);
    }
    gotoBottom("chatBox");
}

function gotoBottom(id){
    var element = document.getElementById(id);
    if(element != null)
    element.scrollTop = element.scrollHeight - element.clientHeight;
 }

getInfo();

