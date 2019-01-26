
    
const play = document.querySelector(".memory-game");
var i;

var playCards = [
    {
        id: 1,
            img: 'ko'
        } ,
        {
            id: 2,
            img: 'hast'
        } ,
        {
            id: 3,
            img: 'gris'
        } ,
        {
            id: 4,
            img: 'lamm'
        } ,
        {
            id: 5,
            img: 'kalkon'
        } ,
        {
            id: 6,
            img: 'tupp'
        } ,
        {
            id: 1,
            img: 'ko'
        } ,
        {
            id: 2,
            img: 'hast'
        } ,
        {
            id: 3,
            img: 'gris'
        } ,
            {
            id: 4,
            img: 'lamm'
        } ,
        {
            id: 5,
            img: 'kalkon'
        } ,
        {
            id: 6,
            img: 'tupp'
        } 
        ]

  playCards.forEach( function (playCards){
        let content= document.createElement('div');
         content.innerHTML = ` 
                <img class="front-face" src="./img/${playCards.img}.png" id='${playCards.id}' alt="${playCards.img}">
                <img class="back-face" src="./img/back_side.png" alt="Memory Card">
                <img class="win" src="./img/${playCards.img}.png">
        `;
        content.classList.add('memoryCard');
        content.id = playCards.id;
        play.appendChild(content);
 });
    
    
    
    
    