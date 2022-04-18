scroll();
window.onscroll = function() { scroll() }

$("#top").load("../html/top.html");

const registerForm   = document.getElementById("regForm");
const pays           = document.getElementById("selection_pays");
const nom            = document.getElementById("lastname");
const prenom         = document.getElementById("firstname");
const pseudo         = document.getElementById("username");
const email          = document.getElementById("useremail");
const password       = document.getElementById("userpwd");
const secondPassword = document.getElementById("verif");
const birthday       = document.getElementById("birthdate");

if(nom != null) {
    verifNom = () => {return testLabels(empty, nom)}
    nom.addEventListener("blur", verifNom);
}

if(prenom != null) {
    verifPrenom = () => {return testLabels(empty, prenom)}
    prenom.addEventListener("blur", verifPrenom);
}

if(pseudo != null) {
    verifPseudo = () => {return testLabels(empty, pseudo) && testLabels(checkPseudo, pseudo)}
    pseudo.addEventListener("blur", verifPseudo);
}

if(email != null) {
    verifEmail = () => {return testLabels(empty, email) && testLabels(checkEmail, email)}
    email.addEventListener("blur", verifEmail);
}

if(password != null) {
    verifPassword = () => {return testLabels(empty, password) && testLabels(checkPassword, password)}
    password.addEventListener("blur", verifPassword);
}

if(secondPassword != null) {
    verifSecondPassword = () => {return testLabels(empty, secondPassword) && testLabels(sameContent, secondPassword)}
    secondPassword.addEventListener("blur", verifSecondPassword);
}

if(birthday != null) {
    verifBirthday = () => {return testLabels(empty, birthday) && testLabels(checkBirthday, birthday)}
    birthday.addEventListener("blur", verifBirthday);
}

var buttonLogIn = document.getElementById("logIn");
if(buttonLogIn != null) {buttonLogIn.addEventListener("click", checkValue);}

Promise.all([fetch('../html/country.txt').then(response => response.text())]).then(([pays_list]) => {
    pays_list = pays_list.split("\n");
    pays_list.forEach(element => {
        $("#selection_pays").append("<option value ='" + element + "'>" + element + "</option>")
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkPseudo(pwd) {
    var nbre = /....../;
    if (!nbre.test(pwd)) {
        return "Votre pseudo doit contenir au moins 6 caractères!";
    }
    return "";
}

function checkEmail(email) {

    var regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (email.match(regEmail)) {
        return "";
    }
    return "Email invalide.";

}

function checkPassword(value) {
    var nbre = /......../;
    var letterSmall = /[a-z]/;
    var letterBig = /[A-Z]/;
    var number = /[0-9]/;
    if (!number.test(value)) {
        return "Votre mot de passe doit contenir un chiffre!";
    } else if (!letterSmall.test(value)) {
        return "Votre mot de passe doit contenir une lettre minuscule!";
    } else if (!letterBig.test(value)) {
        return "Votre mot de passe doit contenir une lettre majuscule!";
    } else if (!nbre.test(value)) {
        return "Votre mot de passe doit contenir au moins 8 caractères!";
    }
    return "";
}

function checkBirthday(value) {
    var auj = new Date();
    var jour = auj.getDay();
    var mois = auj.getMonth();
    var annee = auj.getFullYear();
    var exp = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if (!exp.test(value)) {
        return "Expression de la date invalide (jj/mm/aaaa)!";
    }
    
    var liste = value.split('/');
    if (liste[2] > annee){
        return "Annee de la date invalide!";
    }
    else if (liste[2] == annee && liste[1] > mois){
        return "Mois de la date invalide!";
    }
    value = value.replace(exp, "$3-$2-$1")
    console.log(value);
    let date = new Date(value);
    console.log(date)
    
    if (isNaN(date)){
        return "Date invalide!";
    }
    return "";
}

function empty(value) {
    if (value.length == 0) {
        return "Un champ est vide.";
    }
    return "";
}

function sameContent(content, compare = document.getElementById("userpwd").value) {
    if (content != compare) {
        return "Entrer le même mot de passe dans 'Confirmer mot de passe'.";
    }
    return "";
}

function emptyPays(value){
    if(value == "")
    {
        return "Choissez un pays."
    }
    return "";
}

function testLabels(testFunc, label) {
    message = testFunc(label.value);
    if (0 == message.length) return true;
    invalidArguments(label, message);
    return false;
}

function checkValue() {
    var labels = document.getElementsByClassName("label");
    var singUp = false;
    var pseudo = ""
    var datas = [];

    if (pays != null && !testLabels(emptyPays, pays)) {
        return;
    }
    datas.push(pays.value);

    for (i = 0; i < labels.length; i++) {
        if (!testLabels(empty, labels[i])) {
            return;
        } 
        
        else if (labels[i].id == "nom") {
            datas.push(labels[i].value);
        } 
        
        else if (labels[i] == "prenom") {
            datas.push(labels[i].value);
        } 
        
        else if (labels[i].id == "email") {
            if (!testLabels(checkEmail, labels[i])) {
                datas.push(labels[i].value);
                clear("email");
                return;
            }
        } 

        else if (labels[i].id == "birthday") {
            if (!testLabels(checkBirthday, labels[i])) {
                datas.push(labels[i].value);
                clear("birthday");
                return;
            }
        } 
        
        else if (labels[i].id == "pseudo") {
            if (!testLabels(checkPseudo, labels[i])) {
                clear("pseudo");
                return;
            }
            pseudo = labels[i].value;
        }
        
        else if (labels[i].id == "pass") {
            if (!testLabels(checkPassword, labels[i])) {
                clear("pass");
                clear("verif");
                return;
            }
            datas.push(labels[i].value);
        } 
        
        else if (labels[i].id == "verif") {
            if (!testLabels(sameContent, labels[i])) {
                clear("pass");
                clear("verif");
                return;
            }
            singUp = true;
        }  
    }

    if (singUp) 
    {
        register();
    } 
    else 
    {
        writeMessage("Vous êtes connécté.", "rgb(33, 211, 42)")
    }

    profileTxt = pseudo + "{"
    for (i = 0; i < datas.length; i++) {
        profileTxt += datas[i] + ",";
    }
    profileTxt = profileTxt.slice(0, profileTxt.length - 2)
    profileTxt += "}\n"
    console.log(profileTxt);

    clearAll();
}

function register()
{
    try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }catch (e) {
        xhr = new XMLHttpRequest();
    }
    var formData = new FormData(registerForm);
    console.log(formData);
    xhr.open("POST", "../htbin/register.py");
    xhr.onreadystatechange = function() {
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            writeMessage("Vous êtes enregistré.", "rgb(33, 211, 42)");
        }
    };
    xhr.send(formData);
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
    var label = document.getElementById(labelId);
    label.value = "";
}

function clearAll() {
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