let watchme = document.getElementById('watchme')
let watchme2 = document.getElementById('watchme2')

watchme.className = 'slidein'
const listener = (e) => {
  watchme.className = 'slidein stopped'
}
watchme2.className = 'slidein2'
const listener2 = (e) => {
  watchme2.className = 'slidein2 stopped'
}
