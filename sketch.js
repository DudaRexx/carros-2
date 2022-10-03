var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player,game;
var playerCount,gameState;
var allPlayers;

var carro;
var carro2;
var carros;
var carroImg;
var carro2Img;
var pista;

var moeda;
var vida;
var obstacle1Image;
var obstacle2Image;
var gasolina;

var moedas;
var gasolinas;
var obstaculos; 

var bomba;


function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");

  carroImg = loadImage("assets/car1.png");
  carro2Img  = loadImage("assets/car2.png");  
  pista = loadImage("assets/track.jpg");

  moeda = loadImage("assets/goldCoin.png");
  vida = loadImage("assets/life.png");
  obstacle1Image = loadImage("assets/obstacle1.png");
  obstacle2Image = loadImage("assets/obstacle2.png");
  gasolina = loadImage("assets/fuel.png");

  bomba = loadImage("assets/blast.png");

}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  bgImg = backgroundImage;

}

function draw() {
  background(bgImg);

  if (playerCount === 2){

    game.update(1);

  }

  if (gameState === 1){
    
    game.play();

  }

}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  
}
