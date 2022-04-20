var login = function() {

    var username = document.getElementById("username").value;
    var userpwd = document.getElementById("userpwd").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../htbin/login.py", true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { //Appelle une fonction au changement d'état.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let message = document.getElementById("result");
            message.textContent = xhr.responseText;
            document.getElementById("connecForm").append(message);
        }
    }

    xhr.send("username=" + username + "&userpwd=" + userpwd );
};

var form = document.getElementById("connecForm");

form.addEventListener("submit", function(event) {
    console.log("test");
    event.preventDefault();
    login();
}, true);