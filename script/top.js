//Pour attacher ou détacher la bar du haut de l'écran
scroll();
window.onscroll = function() { scroll() }

//Pour ajouter dans tout les html la top bar
$("#top").load("../top.html");

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