var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var gameOverImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup; 

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
  gameOverImg =loadAnimation("gameOver.png");
}

function setup(){
createCanvas(400,400);

 // Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 18;

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.05;

//creating GameOver Sprite
gameOver = createSprite(150,150);
gameOver.addAnimation("gameOverImg",gameOverImg);
gameOver.scale = 0.6
gameOver.visible = false;
  
//creating Cash,Diamonds,Jwellerly and swordGroup;
cashG = new Group();
diamondsG = new Group();
jwelleryG = new Group();
swordGroup = new Group();

}

function draw() {
  //backGround
  background(0);
  
  //creating Function to move Mouse
  boy.x = World.mouseX;
  
  //creating Edge and EdgeSprites();
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  // drawSprites
  drawSprites();
  
 // creating Text 
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  
  if(gameState === PLAY){
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+10;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+50;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+100;
    }
    else{
      if(swordGroup.isTouching(boy)) {
      gameState = END ;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x = 200;
        boy.y = 300;
        boy.scale = 0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
     }
    }
}

   else if(gameState === END){
    path.velocityY = 0;
    gameOver.visible = true;
     
    //setting life time of Game object so they are never Destroyed
    cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    }
  }

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 9;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 9;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 9;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 9;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}