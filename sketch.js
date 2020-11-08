var PLAY = 1;
var END = 0; 
var Gamestate=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0,survivaltime;

function preload(){
  //loading all the Animations and Images
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage =loadImage("obstacle.png"); 
}

function setup() {
  //creating the canvas
  // createCanvas(600, 600);
 
FoodGroup=createGroup();
obstacleGroup=createGroup();

monkey=createSprite(80,315,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1;
// monkey.velocityX=2;
// monkey.velocityY=2;
  
ground=createSprite(400,350,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
console.log(ground.x)
}

function draw() {
  background(255);
  
  
   stroke("black");
   textSize(20);
   fill("black");
   text("Score:"+ score,300,20,20,20);
  
if (ground.x > 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y>200) {
        monkey.velocityY = -12;
    }
    
    //add gravity
   monkey.velocityY = monkey.velocityY + 0.8
  
  //stop monkey from falling down
  monkey.collide(ground);
  
if(monkey.isTouching(FoodGroup)){
   score=score+1
}

if(monkey.isTouching(obstacleGroup)){
    stroke("black");
    textSize(20);
    fill("black");
    survivaltime=Math.ceil(frameCount/frameRate())
    text("SurvivalTime:"+survivaltime,200,100);
  ground.velocityX=0;
  monkey.visible=false;
  obstacle.velocityX=0;
  banana.velocityX=0;
 
} 
  food();
  Obstacle();
  
 
drawSprites();
}

function food(){
  
  if(frameCount % 80 === 0){
    var banana=createSprite(200,200,20,20)
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.lifetime=200;
    
    FoodGroup.add(banana);
  }
}

function Obstacle(){
  
  if(frameCount % 300 === 0){
    var obstacle=createSprite(200,300,10,10);
    obstacle.velocityX=-4;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=200;
    
    obstacleGroup.add(obstacle);
    }
}
