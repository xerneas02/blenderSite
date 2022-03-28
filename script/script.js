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

function charIsLetter(char) {
    return char.toLowerCase() !== char.toUpperCase();
  }

function checkPasswordComplexity(pwd, labels) {
    var nbre = /......../;
    var letterSmall = /[a-z]/; 
    var letterBig = /[A-Z]/;
    var number = /[0-9]/;
    if (!number.test(pwd))
    {
        invalidArguments(labels, "Votre mot de passe doit contenir un chiffre!");
        return false;
    }
    else if (!letterSmall.test(pwd))
    {
        invalidArguments(labels, "Votre mot de passe doit contenir une lettre minuscule!");
        return false;
    }
    else if (!letterBig.test(pwd))
    {
        invalidArguments(labels, "Votre mot de passe doit contenir une lettre majuscule!");
        return false;
    }
    else if (!nbre.test(pwd))
    {
        invalidArguments(labels, "Votre mot de passe doit contenir au moins 8 caractères!");
        return false;
    }
    return true;
}

function checkValue() {
    var labels = document.getElementsByClassName("label");
    var password = "";
    singUp = false;

    var pays = document.getElementById("selection_pays");
    if (pays != null && pays.value == "") {
        invalidArguments(pays, "Choissez un pays.");
        return;
    }

    for (i = 0; i < labels.length; i++) {
        if (labels[i].value.length == 0) {
            invalidArguments(labels[i], "Le champ " + labels[i].name + " est vide.");
            return;
        }

        if (labels[i].id == "email" && (labels[i].value.indexOf('@') < 1 || labels[i].value.indexOf('@') > labels[i].value.length - 2)) {
            console.log(labels[i].value)
            invalidArguments(labels[i], "Email invalide.");
            clear("email");
            return;
        }

        if (labels[i].id == "pass") {
            if (checkPasswordComplexity(labels[i].value, labels[i]))
                password = labels[i].value;
            else
            {
                clear("pass");
                clear("verif");
                return;
            } 
        }

        if (labels[i].id == "verif") {
            if (labels[i].value != password) {
                invalidArguments(labels[i], "Entrer le même mot de passe dans 'Confirmer mot de passe'.");
                clear("pass");
                clear("verif");
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

function clear(labelId) {
    var labels = document.getElementById(labelId);
    labels.value = "";
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