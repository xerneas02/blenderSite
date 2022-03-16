window.onscroll = function() { scroll() }

$("#top").load("../html/top.html");

var buttonLogIn = document.getElementById("logIn")
if (buttonLogIn != null) buttonLogIn.onclick = function() {
    checkValue();
}

Promise.all([fetch('../html/country.txt').then(response => response.text())]).then(([pays_list]) => {
    pays_list = pays_list.split("\n");
    pays_list.forEach(element => {
        $("#selection_pays").append("<option value ='" + element + "'>" + element + "</option>")
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkValue() {
    var labels = document.getElementsByClassName("label");
    var password = "";
    singUp = false;

    var pay = document.getElementById("selection_pays");
    if (pay != null && pay.value == "") {
        invalidArguments(pay, "Choissez un pay.");
        clear();
        return;
    }

    for (i = 0; i < labels.length; i++) {
        if (labels[i].value.length == "") {
            invalidArguments(labels[i], "Le champ " + labels[i].name + " est vide.");
            clear();
            return;
        }

        if (labels[i].id == "email" && (labels[i].value.indexOf('@') < 1 || labels[i].value.indexOf('@') > labels[i].value.length - 2)) {
            console.log(labels[i].value)
            invalidArguments(labels[i], "Email invalide.");
            clear();
            return;
        }

        if (labels[i].id == "pass") {
            if (labels[i].value.length < 7) {
                invalidArguments(labels[i], "Mot de passe trop cours minimum 7 caractères.");
                clear();
                return;
            }
            password = labels[i].value;
        }

        if (labels[i].id == "verif") {
            if (labels[i].value != password) {
                invalidArguments(labels[i], "Entrer le même mot de passe dans 'Confirmer mot de passe'.");
                clear();
                return;
            }
            singUp = true;
        }
    }


    if (singUp) {
        writeMessage("Vous êtes enregistré.", "rgb(33, 211, 42)")
    } else {
        writeMessage("Vous êtes connécté.", "rgb(33, 211, 42)")
    }
    clear();
}

async function invalidArguments(argument, message = "Erreur") {
    argument.style.backgroundColor = "red";
    writeMessage(message, "rgb(173, 0, 0)");
    await sleep(100);
    argument.style.backgroundColor = "rgb(32, 32, 32)";
}

function writeMessage(message, color = "red") {
    text = document.getElementById("message");
    text.style.color = color;
    text.textContent = message;
}

function clear() {
    var labels = document.getElementsByClassName("label");
    for (i = 0; i < labels.length; i++) {
        labels[i].value = "";
    }
}

function scroll() {
    offSet = 48
    var topBar = document.getElementsByClassName("topBar")



    if (window.pageYOffset < offSet) {
        pos = "absolute"
        T = offSet.toString() + "px"
    } else {
        pos = "fixed"
        T = "0px"
    }
    for (i = 0; i < topBar.length; i++) {
        topBar[i].style.position = pos
        topBar[i].style.top = T
    }

}