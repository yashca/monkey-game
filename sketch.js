
var monkey , monkey_running;
var bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground;
var gameState = 1;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(900,300);
  
  monkey = createSprite(80,165,20,20);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,295,900,10);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  if(gameState === 1){
    
  if(keyDown("space") && monkey.y >= 259){
    monkey.velocityY = -11;
  }

  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = 2;
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
  
  ground.velocityX = -5;
  ground.x = ground.width/2;
    
  stroke("black");
  textSize(20);
  fill("black");
  score = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + score,400,35);

  spawnBanana();
  spawnObstacles();
 } else
  if(gameState === 2){
    bananaGroup.setLifetime = -1;
    obstacleGroup.setLifetime = -1;
    
    bananaGroup.setVelocityXEach(0);   
    obstacleGroup.setVelocityXEach(0);
    
    monkey.velocityY = 0;
    
    ground.velocityX = -5;
    ground.x = ground.width/2;
  }
  
  drawSprites();
  console.log(gameState);
}

function spawnBanana (){
  if(frameCount % 80 === 0){
  var banana = createSprite(600,Math.round(random(120,200)),20,20);
  banana.addImage("banana", bananaImage);
  banana.velocityX = -5;
  banana.lifetime = 130;
  banana.scale = 0.1;
  bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
  var obstacle = createSprite(600,Math.round(random(120,200)),20,20);
  obstacle.addImage("obsta", obstacleImage);
  obstacle.velocityX = -7;
  obstacle.lifetime = 130;
  obstacle.scale = 0.1;
  obstacleGroup.add(obstacle);
  }
}


