
document.addEventListener('DOMContentLoaded', function (){


const cards = document.querySelectorAll('.memoryCard');
const counter = document.querySelector(".move");
const pointer = document.querySelector(".points");
const hover = document.querySelector(".hoverGameOff");
const afterGame = document.querySelector(".game");
const counterEnd = document.querySelector(".moveEnd");
const pointerEnd = document.querySelector(".pointsEnd");
const seconds = document.querySelector('.seconds');
const timeIsOut = document.querySelector('.timeIsOut');

var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var move = 0;
var points = 0;
var timeleft;
var downloadTimer = 0;
var intervalId = '';

// starta/ starta om 0-ställer/ sartar timer  
function start(){
  cards.forEach(kort => {
    kort.classList.remove("flip");
    kort.classList.remove("match");
  });
  counter.innerHTML = move = 0;
  pointer.innerHTML = points = 0;
  hasFlippedCard = false;
  secondCard = null;
  firstCard = null;
  lockBoard = false;
  timeleft = 30;
  hover.classList.toggle('gameOn');
  timer();
  
}
// räknar antal klick 
function moves(){
  move++;
  counter.innerHTML = move;
}
// lägger till css-flip vid klick
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  
  this.classList.add('flip');
  moves();
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}
// kollar om dataset matchar, gör dom de tas klick bort från korten med flip aktiv, är det inte match, tas flip bort med 1 sekunds fördröjning. 
function checkForMatch() {
  let isMatch = firstCard.id === secondCard.id;
  
  isMatch ? ifMatch() : notMatch();
}

function ifMatch() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  points++;
  pointer.innerHTML = points;
  firstCard.classList.add('match');
  secondCard.classList.add('match');
  // kollar om omgången är klar, startar om (ska ersättas med nåt som visar hur det gick, och val om att starta om)
  if (points == 6){
    setTimeout(() => {
      gameOver();
    }, 2500);
  }
  resetBoard();
}
// om ej match, tar bort css klass flip. så korten vänds tillbaka.
function notMatch() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}
// 0-ställer
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  
}

// blandar kortens ordning med Math.random, "()" runt funktionen gör att funktionen körs direkt.

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// klick funktion på korten

cards.forEach(card => card.addEventListener('click', flipCard));


// startar spelet vid klick på start-knappen
document.getElementById("replay").addEventListener("click", start);

// gör gameOver sidan synlig
function gameOver(){
  afterGame.classList.add('gameOver');
  afterGame.classList.remove('game');
  counterEnd.innerHTML = move;
  pointerEnd.innerHTML = points;
}


// timer
function timer () {
  intervalId = setInterval(function(){
    document.getElementById("progressBar").value = 30 - --timeleft;
    if (timeleft == 0|| points == 6 ){
      let tid = 30 -  timeleft - 1;
      if (timeleft > 0) {
        seconds.innerHTML=tid;
      } else
       { 
        timeIsOut.innerHTML = '';
        }
        clearInterval(downloadTimer);
        gameOver();
        clearInterval(intervalId);
      } 
    }, 1000);
  }
});

