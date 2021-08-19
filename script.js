
//Globale variabler: definer variablerne så de kankaldes senere

let wheel = document.querySelector("#wheel");  //definerer hvordan man styrer
let sprite1 = document.querySelector(".sprite1"); //definerer Porschen 
let scene = document.querySelector(".scene"); //Definere scenen/spillets baggrund
let audio = document.querySelector("#audio"); //definere lyden, # = ID
let screenText = document.querySelector(".screen-text"); //definerer teksten der popper op på spillets skærm
let scoreSpan = document.querySelector("#score"); //definerer point
let enemy1 = document.querySelector(".sprite-enemy1"); //definerer fjenden
let globalScore = 0; //
let timer;
//browserens url i tekst format
let url = window.location.href;
//browserens url bliver konverteret til et object
url = new URL(url);
let playerCar = url.searchParams.get("car");
sprite1.setAttribute("src", playerCar);

//Definerer eksplosionen når du dør
let explosionCar;

//if statement der fortæller hvilken eksplosion der skal vises
if (playerCar == "sprite1.png"){
    explosionCar = "sprite1-explode.png"
}else{
    explosionCar = "sprite2-explode.png"
}
//tilføjer en begivenhed til en eller flere definerede variabler 
scene.addEventListener("click", function(){
    wheel.value = 4;
    wheel.focus();
    globalScore = 0;
    screenText.style.display = "none";
    scene.classList.add("scene-active");
    
//  bruger getRandomNumber til at gøre det tilfældigt hvor lastbilen starter  
    let enemyXPos = getRandomNumber();
    enemy1.style.left = enemyXPos*10+"%";
    enemy1.classList.add("enemy-active");
    enemy1.addEventListener("animationiteration", function(){
        enemyXPos = getRandomNumber();
        enemy1.style.left = enemyXPos*10 + "%";
    });

    timer = window.setInterval(function(){
        globalScore = globalScore + 10;
        scoreSpan.innerHTML = globalScore;
        

        if (enemyXPos == wheel.value && enemy1.offsetTop>300){
            gameEnd();
            return;
        }     
    }, 100);
});

//
wheel.addEventListener("input", function (){
    sprite1.style.left = this.value*10 + "%" ;

    //hvis bilen kolliderer med autoværn
    if(this.value <2 || this.value >7){
        gameEnd();
        return;
    }   
});

//HELPER FUNCTIONS
function getRandomNumber(){
    return Math.floor(Math.random()*(8-2)+2);
};

//HANDLER FUNCTIONS
//kalder gameEnd i eventListener, hvis bilen ramme autoværn eller modkørende afspilles lyd + point stopper
function gameEnd (){
    //billedet af bilen der eksplodere, kaldes i if statement
    sprite1.setAttribute("src", explosionCar);
    //Kollisions lyden
    audio.play();
    //stop scenen hvis bilen rammer ind i noget
    scene.classList.remove("scene-active");
    //reset timer
    window.clearInterval(timer);
    //reset timeren 
    screenText.style.display = "flex";
    //viser game over + point
    screenText.innerHTML = "GAME OVER <br> Score:" + globalScore;
};