
window.onscroll = function() {scroll()}


function scroll(){
    offSet = 48
    var topBar = document.getElementsByClassName("topBar")
    
    

    if (window.pageYOffset < offSet) 
    {
        pos = "absolute"
        T = offSet.toString()+"px"
    }
    else 
    {
        pos = "fixed"
        T = "0px"     
    }
    console.log(T)
    for( i = 0 ; i < topBar.length ; i++)
    {
        topBar[i].style.position = pos
        topBar[i].style.top = T
    }

}
