//SOUND CREDIT//

// DEATH MUSIC: Farewell Princess by FoolBoyMedia -- https://freesound.org/s/246391/ -- License: Attribution NonCommercial 4.0 
// CHIME: Short Success Sound Glockenspiel Treasure Video Game.mp3 by FunWithSound -- https://freesound.org/s/456965/ -- License: Creative Commons 0
//FLY SOUND: jump01.mp3 by Taira Komori -- https://freesound.org/s/211741/ -- License: Attribution 4.0
//BG MUSIC: Teaser Background Music by Migfus20 -- https://freesound.org/s/560738/ -- License: Attribution 4.0

 
let bird;
let pigeon
let pipes;
let isGameOver = false;
let hasGameBegun = false; 
let score = 0;
let arcadeFont
let levelonebg
let building
var x1 = 0
var x2 
let backgroundMusic
let flapSound
var scrollSpeed = 0.7
let minDistanceBetweenPipes
let nextSpawnDistance
let mySound
let Chime
let bgMusicDeath

function preload() {
  
  arcadeFont = loadFont('assets/arcadefont.ttf');
  pigeon = loadImage ('pigeon.png')
  levelonebg = loadImage ('birdgamebg.png')
  building = loadImage ('building.png')
backgroundMusic = loadSound('flappybirdmusic.mp3')
  
flapSound = loadSound('flappyjump.mp3')
Chime = loadSound('chimechime.mp3')
bgMusicDeath = loadSound('deathsad.mp3')
}

function setup() {
  createCanvas(600, 400);
  minDistanceBetweenPipes = width / 3;
  textFont(arcadeFont); 
   x2 = width  
  resetGame();
  
  noLoop(); 
  backgroundSong();
}
function backgroundSong(){
  
  backgroundMusic.play()
  backgroundMusic.loop()
  backgroundMusic.setVolume(0.15)
  userStartAudio()
  
  
}

function resetGame(){
  score = 0;
  isGameOver = false; 
  
  bird = new Bird(64, height / 2);
  pipes = [new Pipe()];
  nextSpawnDistance = random(minDistanceBetweenPipes, width - width/4);
  loop();
}

 function draw() {
  background(255);
  
  image(levelonebg, x1, 0);
  image(levelonebg, x2, 0);
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 <= -levelonebg.width) {
    x1 = x2 + levelonebg.width;
  }
  if (x2 <= -levelonebg.width) {
    x2 = x1 + levelonebg.width;
  }     
  
  if (pipes.length <= 0 || width - pipes[pipes.length - 1].x >= nextSpawnDistance) {
    pipes.push(new Pipe()); 
    nextSpawnDistance = random(minDistanceBetweenPipes, width - width/5);
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].draw();
    
    if (pipes[i].checkIfHitsBird(bird)) {
      isGameOver = true;
      noLoop()
      bgMusicDeath.play()
      bgMusicDeath.loop()
      bgMusicDeath.setVolume(0.5); 
    }
    
    if (pipes[i].pastBird === false && pipes[i].checkIfPastBird(bird)) {
      score++;
      Chime.play()
    }
    
    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1); 
    }
  }
  
  bird.update();
  bird.draw(); 
  drawScore();
}
function drawScore() {

  fill(0);
  textAlign(LEFT);
  textSize(15);
  text('Score:' + score, 10, 20);

  if (isGameOver) {

    // dark overlay
    backgroundMusic.stop()
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    // draw game over text
    textAlign(CENTER);
    textSize(35);
    fill(255);
    text('GAME OVER!', width / 2, height / 3);
    
    textSize(12);
    text('Press SPACE BAR to play again.', width / 2, height / 2);
  }else if(hasGameBegun == false)  {
    
    
    // dark overlay
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    textAlign(CENTER);
    textSize(15);
    fill(255);
    text('Press SPACE BAR to play!', width / 2, height / 3);
  }
}

  function keyPressed(){
  if (key == ' ') { 
    bird.flap();
    flapSound.play();
    flapSound.setVolume(0.1);
  }
  if (isGameOver && key == ' ') {
    resetGame()
    bgMusicDeath.stop()
    backgroundMusic.play()
  } else if (!hasGameBegun && key == ' ') {
    hasGameBegun = true;
    loop();
  }
}