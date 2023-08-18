var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombie, zombiesGroup;
var bulletImg, bullet, bulletsGroup;
var bulletNo = 75;
var life = 3;
var gameState = "play";
var score = 0;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bullet2.png");
  bgImg = loadImage("assets/bg.jpeg");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   zombiesGroup = new Group();
   bulletsGroup = new Group();

}

function draw() {
  background(0); 
  spawnZombies();



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if (life === 0){
  gameState = "lost"
}
if(score == 200){
  gameState = 1;
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bullet = createSprite(displayWidth - 1150, player.y - 30, 20, 10);
 bullet.scale = 0.1;
 bullet.velocityX = 20;
 bullet.addImage(bulletImg);
 bulletsGroup.add(bullet);
 if(bulletNo>0){
  bulletNo = bulletNo-1;
 }
}
if(bulletNo===0){
  gameState = "noBullets";
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombiesGroup.isTouching(bulletsGroup)){
  for(var i = 0; i < zombiesGroup.length; i++){
    bulletsGroup.destroyEach();
    zombiesGroup[i].destroy();
    score = score+1;
    
  }
  if(zombiesGroup.isTouching(player)){
    for(var i = 0; i < zombiesGroup.length; i++){
      if(zombiesGroup[i].isTouching(player)){
        zombiesGroup.destroyEach();
        life = life - 1;
        
      }
    }
  }
  
}
drawSprites();

}
function spawnZombies(){
  if(frameCount%60===0){
  zombie = createSprite(random(1000, 1500),random(100, 500),40, 40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.12;
  zombie.velocityX = -5;
  zombie.lifetime = 300;
  zombiesGroup.add(zombie);
}
}