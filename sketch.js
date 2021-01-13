var PLAY = 1;
var END = 0;
var gameState = PLAY;

//assigning all the global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;

var score;
var survivalTime;

var gameOver, gameOverImg;
var restart, restartImg;


//loading all the animations and images
function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImg = loadImage("Game_over.png");
  
  restartImg = loadImage("restart.png");
 
}


function setup() {
  //creating a sprite for monkey, assigning its properties
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //creating a ground sprite, assigning its properties 
  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width/2;
  
  //creating the groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
  //declaring the score as zero
  score = 0;
  survivalTime = 0;
  
 gameOver = createSprite(200, 150, 20, 20);
 gameOver.addImage("over", gameOverImg);
 gameOver.scale = 0.2;
 gameOver.visible = false;
  
 restart = createSprite(200, 220, 20, 20);
 restart.addImage("restart", restartImg);
 restart.visible = false;
  
}


function draw() {
  //setting background, clearing screen
background("white");
  
  //displaying the score using string concatenation
  stroke("black");
  textSize("20");
  fill("black");
  text("Score: "+ score, 300,50);
  
  //displaying the survival time using string concatenation
  stroke("black");
  textSize("20");
  fill("black");
  text("Survival Time: "+ survivalTime, 100,50);
  
  //colliding monkey with the ground
  monkey.collide(ground);
  
  if(gameState === PLAY){
     survivalTime = survivalTime + Math.round(getFrameRate()/65);
    
      //creating illusion, infinite scrolling ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //allowing monkey to jump after space is pressed
  if(keyDown("space")&& monkey.y > 250) {
      monkey.velocityY = -12;
  }
  //adding gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
      //calling functions
    spawnbananas();
    spawnObstacles();
    
       //to destroy the bananas after collision and increasing the score
  if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
     score = score + 1;
  }
     
  if(monkey.isTouching(obstacleGroup)){
    gameOver.visible = true;
    restart.visible = true;
     gameState = END;
     
  }
}
  else if(gameState === END){
     //changing the groups' velocity
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
     
      //destroying both the groups
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
    
      monkey.visible = false;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  //to draw the sprites
  drawSprites();
  
}


function spawnbananas() {
  //to spawn the bananas after interval of 80 at random y positions
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    
     //assigning lifetime to the banana
    banana.setLifetime = 200;
   
    
    //adding each banana to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
  //to spawn obstacle after interval of 300
 if (frameCount % 300 === 0){
   obstacle = createSprite(400,310,10,40);
   obstacle.addImage("obstacles", obstacleImage);
   obstacle.velocityX = - 6;
   obstacle.setCollider("rectangle", 0, 0, 350, 350);
 
    //assigning scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.setLifetime = 300;
   
   //adding each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
}

function reset(){
  gameState = PLAY;
  monkey.visible = true;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  survivalTime = 0;
}

