
window.onscroll = function() {scroll()}

/*var pays_file = new XMLHttpRequest();
pays_file.open("GET", "file://../html/country.txt", false);
pays_file.onreadystatechange = function()
{
   if (pays_file.readyState === 4)
   {
        if (pays_file.status === 200 || pays_file.status == 0)
        {
            var text = pays_file.responseText;
            console.log(text.toString());
        }
   }
   pays_file.send(null);
}*/
Promise.all([fetch('../html/country.txt') .then(response => response.text())]).then(([pays_list]) => 
{
    console.log(pays_list.toString());
    pays_list = pays_list.split("\n");
    pays_list.forEach(element => 
    {
        $("#selection_pays").append("<option value ='" + element + "'>" + element + "</option>")
    });
});




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
