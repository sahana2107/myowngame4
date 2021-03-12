var backImage,backgr;
var sanna, sanna_running;
var ground,ground_img;
var obstacle,obstacleGrp,obstacleImage;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("background.png");
  sanna_running = loadAnimation("girl_01.PNG","girl_02.PNG","girl_03.PNG","girl_04.PNG","girl_05.PNG");
  obstacleImage = loadImage ("stone.png")
 
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=2.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  sanna  = createSprite(100,100,20,50);
  sanna.addAnimation("Running",sanna_running);
  sanna.scale = 0.9;
  sanna.y = 100;
  
  
  ground = createSprite(400,450,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  obstacleGrp = new Group();
  
}

function draw() { 
  background(0);

  if (gameState === PLAY){

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      sanna.velocityY = -12;
    }
    sanna .velocityY = sanna.velocityY + 0.8;
  
    sanna .collide(ground);
    console.log(sanna.y);
  
  spawnObstacles();

  if (obstacleGrp.isTouching(sanna)){
    ground.velocityX = 0;
    sanna.velocityY = 0;
    obstacleGrp.setVelocityXEach(0);
    obstacleGrp.setLifetimeEach(-1);
  }

  if(obstacleGrp.isTouching(sanna)){
    gameState="end";
   
  }

  drawSprites();
  }
}

function spawnObstacles(){
  if (frameCount%300===0){
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacleGrp.add(obstacle);
  }
}