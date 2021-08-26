/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

 kangaroo= createSprite (150,300)
 kangaroo.addAnimation ("k_running",kangaroo_running)
 kangaroo.scale= 0.1;
  shrubsGroup = new Group();
  kangaroo.setCollider("circle",0,0,600)
  kangaroo.debug=true
  
  obstaclesGroup = new Group();
  invisibleGround=createSprite (400,350,1600,15);
  invisibleGround.visible=false;
  score = 0;

}

function draw() {
  background(255);
  kangaroo.x=camera.position.x-270;
  if (gameState===PLAY){
    jungle.velocityX=-10;
    
  

  if ( jungle.x<100) {
    jungle.x=400;
  }
  if (keyDown("SPACE")){
    kangaroo.velocityY=-14;
  }
  kangaroo.velocityY=kangaroo.velocityY+0.8;
  spawnShrubs()
  spawnObstacles();
  kangaroo.collide(invisibleGround);
  if(obstaclesGroup.isTouching(kangaroo)){
    collidedSound.play();
    gameState = END;
  }
  if(shrubsGroup.isTouching(kangaroo)){

    shrubsGroup.destroyEach();
  }
}
else if (gameState === END) {
  //set velcity of each game object to 0
  kangaroo.velocityY = 0;
  jungle.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  shrubsGroup.setVelocityXEach(0);

  //change the trex animation
  kangaroo.changeAnimation("collided",kangaroo_collided);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  shrubsGroup.setLifetimeEach(-1);
  
}
  drawSprites();

  

}

function spawnShrubs(){
  if (frameCount % 150 === 0){
    var shrubs = createSprite(camera.position.x+500,300,40,10);
    shrubs.velocityX = -4;
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: shrubs.addImage(shrub1);
               break;
       case 2: shrubs.addImage(shrub2);
               break;
       case 3: shrubs.addImage(shrub3);
               break;
       
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     shrubs.scale = 0.05;
     shrubs.lifetime = 300;
     
    
    //add each obstacle to the group
     shrubsGroup.add(shrubs);
  }
 }
 function spawnObstacles() {
  //write code here to spawn the clouds
   if (frameCount % 120 === 0) {
     obstacles = createSprite(camera.position.x+400,300,40,40);
    // obstacles.y = Math.round(random(10,60));
     obstacles.setCollider("rectangle",0,0,200,200)
     obstacles.addImage(obstacle1);
     obstacles.scale = 0.15;
     obstacles.velocityX = -4;
    
     //assign lifetime to the variable
     //obstacles.lifetime = 134;
    
     

    
    //adding cloud to the group
    obstaclesGroup.add(obstacles);
    }
}

