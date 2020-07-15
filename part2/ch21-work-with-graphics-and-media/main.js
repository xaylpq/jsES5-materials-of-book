var a = new Audio();
if (a.canPlayType("audio/wav")) {
    a.src = "soundeffect.wav";
    a.play();
}

// Когда документ будет загружен, запустить фоновое проигрывание мелодии
window.addEventListener("load", function() {
    document.getElementById("music").play();
}, false);