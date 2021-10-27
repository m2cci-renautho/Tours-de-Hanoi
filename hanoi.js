function hanoi(N, zi, zf) {
  if (N == 1) MOVES.push(zi + ";" + zf);
  else {
    hanoi(N - 1, zi, 6 - (zi + zf));
    MOVES.push(zi + ";" + zf);
    hanoi(N - 1, 6 - (zi + zf), zf);
  }
}

function ereaseZones(N) {
  let zones = document.querySelectorAll(".zone");
  for (z of zones) {
    z.innerHTML = "";
    z.style.backgroundSize = "18px " + (N + 1) * 25 + "px";
  }
}

function initGame() {
  let number = document.getElementById("numberOfDisks");
  let N = parseInt(number.value);
  let zone = document.getElementById("zone1");

  MOVES = [];
  ereaseZones(N);
  currentMove = 0;
  for (let i = 0; i < N; i++) {
    disc = document.createElement("div");
    disc.classList.add("disc");
    disc.style.width = 80 - 5 * i + "%";
    zone.appendChild(disc);
  }
  if (N > 0) hanoi(N, 1, 3);
}

function moveTo(z1, z2) {
  let elt = document.querySelector("#zone" + z1 + " .disc:last-child");
  let newZone = document.getElementById("zone" + z2);
  newZone.appendChild(elt);
}

function next() {
  if (!isEnded()) {
    move = MOVES[currentMove];
    zd = move.split(";")[0];
    zf = move.split(";")[1];
    moveTo(zd, zf);
    currentMove++;
  }
}
function prev() {
  if (currentMove > 0) {
    currentMove--;
    move = MOVES[currentMove];
    zd = move.split(";")[1];
    zf = move.split(";")[0];
    moveTo(zd, zf);
  }
}

function toEnd() {
  while (currentMove < MOVES.length) {
    next();
  }
}
function playPauseHandler() {
  playing = !playing;
}
let isEnded = () => currentMove >= MOVES.length;

function play() {
  let number = document.getElementById("numberOfDisks");

  if (playing) {
    currentButtonStyle = newButtonStyle;
    newButtonStyle = "fa-pause";

    if (isEnded()) {
      playing = false;
    } else {
      next();
      number.disabled = true;
    }
  } else {
    currentButtonStyle = newButtonStyle;
    newButtonStyle = "fa-play";
    number.disabled = false;
  }
  playPauseButton.querySelector("i").classList.remove(currentButtonStyle);
  playPauseButton.querySelector("i").classList.add(newButtonStyle);
}

let MOVES = new Array();
let playing = false;
let currentButtonStyle;
let newButtonStyle;
let currentMove = 0;

let playPauseButton = document.getElementById("play");
playPauseButton.addEventListener("click", playPauseHandler, true);

initGame();
let interval = setInterval(play, 400);
