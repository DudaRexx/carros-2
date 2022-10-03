class Game {
  constructor() {

    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leaderTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.mover = false;
    this.teclaA = false;
    this.explodiu = false;

  }

  start() {

    form = new Form();
    form.display();
    player = new Player();

    playerCount = player.getCount();

    carro = createSprite(width/2-50,height-100);
    carro.addImage("carro",carroImg);
    carro.scale = 0.07;

    carro2 = createSprite(width/2+100,height-100);
    carro2.addImage("carro2",carro2Img);
    carro2.scale = 0.07;

    carro.addImage("bomba",bomba);
    carro2.addImage("bomba",bomba);

    carros = [carro,carro2];

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    moedas = new Group();
    gasolinas = new Group();
    obstaculos = new Group();

    this.addSprites(15,moeda,0.09,moedas);
    this.addSprites(5,gasolina,0.02,gasolinas);
    this.addSprites(obstaclesPositions.length, obstacle1Image,0.04,obstaculos,obstaclesPositions);

  }

  play(){

    form.hide();
    Player.getInfo();

    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    
    this.reset();

    player.getcarsend();

    if(allPlayers!== undefined){

      image(pista,0,-height*5,width,height*6);

      this.show_element();

      this.showLeaderboard();

      this.showlife();
      this.showfuel();

      var index = 0;
      for(var plr in allPlayers){

        index += 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        carros[index - 1].position.x = x;
        carros[index - 1].position.y = y;

        var vida = allPlayers[plr].life;

        if(vida <= 0){

          carros[index - 1].changeImage("bomba");

          carros[index - 1].scale = 0.3;

        }

        if (index === player.index){

          camera.position.y = carros[index - 1].position.y;
          text(player.name,carros[index - 1].position.x,carros[index - 1].position.y - 100);

          this.addFuel(index);
          this.addCoins(index);
          this.colisao(index);
          this.colisao_carros(index);

          if (player.life <= 0){

            this.explodiu = true;

          }

        }

      }

      this.controle();

      var linha = height * 6 - 100;

      if (player.positionY > linha){

        gameState = 2;
        player.rank += 1;
        Player.updaterank(player.rank);
        player.update();
        this.showRank();

      }

      drawSprites();

    }

  }

  getState(){

    var playerRef = database.ref("gameState");
    playerRef.on ("value",(data) => {

      gameState = data.val();

    })

  }

  update (valor) {

    database.ref("/").update({

      gameState: valor,

    })

  }

  controle (){

    if(!this.explodiu){

      if (keyIsDown(87)){

        player.positionY += 10;
        player.update();
  
        this.mover = true;
  
      }
  
      if (keyIsDown(65)){
  
        player.positionX -= 10;
        player.update();
  
        this.teclaA = true;
  
      }
  
      if (keyIsDown(68)){
  
        player.positionX += 10;
        player.update();
  
        this.teclaA = false;
  
      }
  
      if (keyIsDown(83)){
  
        player.positionY -= 10;
        player.update();
  
      }

    }

  }

  show_element (){

    this.resetTitle.html ("Reiniciar");
    this.resetTitle.position (width/2 + 200, 50);
    this.resetTitle.class ("resetText");

    this.resetButton.position (width/2 + 230, 100);
    this.resetButton.class ("resetButton");

    this.leaderTitle.html("Rank");
    this.leaderTitle.position(width/3 - 60, 50);
    this.leaderTitle.class("resetText");

    this.leader1.position(width/3 - 60, 100);
    this.leader1.class("leadersText");

    this.leader2.position(width/3 - 60, 150);
    this.leader2.class("leadersText");

  }

  reset(){

    this.resetButton.mousePressed(()=>{

      database.ref("/").set({

        playerCount: 0,
        gameState: 0,
        players: {},
        carrosEnd: 0,

      });

      location.reload()

    })

  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if ((players[0].rank === 0 && players[1].rank === 0) ||players[0].rank === 1 ) {

      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;

      leader2 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;
    
    }

    if (players[1].rank === 1) {
      leader1 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;

      leader2 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;

    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);

  }

  addSprites(num,spriteImage,scale,group,positions = []){

    for(var i = 0; i < num; i ++){

      var x;
      var y;

      if (positions.length > 0 ){

        x = positions[i].x;
        y = positions[i].y;

        spriteImage = positions[i].image;

      }

      else {

        x = random (width / 2 + 150,width / 2 - 150);
        y = random (- height * 4.5, height - 400);

      }

      var Sprite = createSprite (x,y);
      Sprite.addImage(spriteImage);
      Sprite.scale = scale;
      group.add(Sprite);

    }



  }

  showRank() {

    swal({

      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada com sucesso!",
      imageUrl:
     "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"

    });

  }

  gameOver() {

    swal({

      title: `Fim de Jogo`,
      text: "Oops você perdeu a corrida!",
      imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Obrigado por jogar"

    });

  }

  showlife(){

    push();
    image(vida,width / 2 - 130,height - player.positionY - 200, 20, 20);
    fill("black");
    rect(width / 2 - 100,height - player.positionY - 200, 200, 20);
    fill("red");
    rect(width / 2 - 100,height - player.positionY - 200, player.life, 20);
    pop();

  }

  showfuel(){

    push();
    image(gasolina, width / 2 - 130,height - player.positionY - 150, 20, 20);
    fill("black");
    rect(width / 2 - 100, height - player.positionY - 150, 200, 20);
    fill("grey");
    rect(width / 2 - 100, height - player.positionY - 150, player.fuel, 20);
    pop();

  }

  addFuel(index) {
    //adicionando combustível
    carros[index - 1].overlap(gasolinas, function(collector, collected) {
      player.fuel = 200;
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();

    });

    if(player.fuel > 0 && this.mover){

      player.fuel -= 0.5;

    }

    if(player.fuel <= 0){

      gameState = 2;
      
      this.gameOver()

    }

  }
  
  addCoins(index){

    carros[index - 1].overlap(moedas, function(collector, collected) {

      player.score += 20
      player.update();
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();

    });

  }

  colisao(index){

    if(carros[index -1].collide(obstaculos)){

      if(this.teclaA){

        player.positionX += 100;

      }

      else{

        player.positionX -= 100;

      }

      if(player.life > 0){

        player.life -= 200 / 4;

      }

      player.update();

    }

  }

  colisao_carros(index){

    if(index === 1){

      if(carros[index - 1].collide(carros[1])){

        if(this.teclaA){

          player.positionX += 100;
  
        }
  
        else{
  
          player.positionX -= 100;
  
        }
  
        if(player.life > 0){
  
          player.life -= 200 / 4;
  
        }
  
        player.update();

      }

    }

    if(index === 2){

      if(carros[index - 1].collide(carros[0])){

        if(this.teclaA){

          player.positionX += 100;
  
        }
  
        else{
  
          player.positionX -= 100;
  
        }
  
        if(player.life > 0){
  
          player.life -= 200 / 4;
  
        }
  
        player.update();

      }

    }

  }



}