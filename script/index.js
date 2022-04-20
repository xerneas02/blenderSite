let watchme = document.getElementById('watchme')
let watchme2 = document.getElementById('watchme2')
let watchme3 = document.getElementById('watchme3')

watchme.className = 'slidein'
const listener = (e) => {
  watchme.className = 'slidein stopped'
}
watchme2.className = 'slidein2'
const listener2 = (e) => {
  watchme2.className = 'slidein2 stopped'
}

rotation(watchme3);

async function rotation(img){
    n = 0;
    while (true){
      img.src = "../img/rotation/" + n + ".png";
      await sleep(100);
      n = (n+1)%19;
    }
}

//fonction qui fait une pause de x miliseconde
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
