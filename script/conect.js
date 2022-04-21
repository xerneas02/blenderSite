var login = function() {

    var username = document.getElementById("username").value;
    var userpwd = document.getElementById("userpwd").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../htbin/login.py", true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { //Appelle une fonction au changement d'état.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let label = document.getElementById("result");
            var element = document.getElementById("link");
            element.setAttribute("href", "");
            element.innerHTML = "";
            label.textContent = xhr.responseText;
            message = label.textContent;
            color = "rgb(173, 0, 0)";
            if(message.includes("Bonjour ")){   
                color   = "rgb(33, 211, 42)";
                var link = "private.html";
                element.setAttribute("href", link);
                element.innerHTML = "Accèdez à votre page personnelle: CLIQUEZ ICI!";
            }
            writeMessage(message, color);
        }
    }

    xhr.send("username=" + username + "&userpwd=" + userpwd );
};

var form = document.getElementById("connecForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    login();
}, true);


function writeMessage(message, color = "red") {
    text = document.getElementById("result");
    text.style.color = color;
    text.textContent = message;
}