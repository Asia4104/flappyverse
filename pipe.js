class Pipe {
  constructor() {
    this.x = width;
    this.width = 50;
    this.speed = 4;
    let minimumPipeGap = 140;
    
    let gap = random(minimumPipeGap, height/3);
    this.topHeight = random(0, height - gap);
    this.bottomHeight = height - (this.topHeight + gap);
    
    this.pastBird = false; 
  }
  
  checkIfHitsBird(bird){
    if((bird.x + bird.width > this.x && bird.x < this.x + this.width) &&
       (bird.y < this.topHeight || (bird.y + bird.height) > (height - this.bottomHeight))){
      return true; 
    }
    return false;
  }
  
  checkIfPastBird(bird){
    this.pastBird = bird.x > this.x + this.width;
    return this.pastBird;
  }
  
  update(score) {
    if (score > 1) {
      this.speed = 6; 
    }
    this.x -= this.speed; 
  }
  
  draw(){
    image(building, this.x, 0, this.width, this.topHeight);
    image(building, this.x, height - this.bottomHeight, this.width, this.bottomHeight);
  }
}