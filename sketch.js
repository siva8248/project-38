var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var gameState;
var bedroom,garden,livingroom,washroom;

function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  milkImg = loadImage("milk.png");
  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  livingroom = loadImage("Living Room.png");
  washroom = loadImage("washroom.png")
}

function setup() {
  database = firebase.database();
  createCanvas(800, 600);
  foodObj=new Food();  
  dog = createSprite(390,300,50,50);
  dog.addImage(sadDog);
  dog.scale = 0.4; 
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20); 
  milkBotltle1 = createSprite(270,510,10,10);
  milkBotltle1.addImage(milkImg);
  milkBotltle1.scale = 0.04;
  milkBotltle1.visible = false;
}

function draw() {  
  background("lightblue")
  foodObj.display();
  writeStock(foodS); 
  if(foodS == 0){
    dog.addImage(happyDog);
  }else{
    dog.addImage(sadDog);
  }
  var gameStateRef=database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState = data.val();
  });
  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.4;
    dog.y=300;
    ghj();
    milkBotltle1.visible = true;
  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.4;
    dog.y=300;
    ghj();
    milkBotltle1.visible = true;
  } 
  var Bath=createButton("I want to take bath");
  Bath.position(680,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    background(255,255,255);
    milkBotltle1.visible = false;
  }
  var Sleep=createButton("I am very sleepy");
  Sleep.position(810,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    background(255,255,255);
    milkBotltle1.visible = false;
  }
  var Play=createButton("Lets play !");
  Play.position(600,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    background(255,255,255);
    milkBotltle1.visible = false;
  }
  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(680,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    background(255,255,255);
    milkBotltle1.visible = false;
  }
  drawSprites();
}
function readStock(data)
{
  foodS = data.val();
}
function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
function ghj(){
  textSize(20);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,290,520);
}