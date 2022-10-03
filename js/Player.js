class Player {
  constructor() {

    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.fuel = 200;
    this.life = 200;


  }

  getCount(){

    var playerRef = database.ref("playerCount");
    playerRef.on ("value",(data) => {

      playerCount = data.val();

    })

  }

  updateCount (valor) {

    database.ref("/").update({

      playerCount: valor,

    })

  }

  addplayer(){

    var playerIndex = "players/player" + this.index;

    if (this.index === 1){

      this.positionX = width/2-100;

    }

    else {

      this.positionX = width/2+100;

    }

    database.ref(playerIndex).set({

      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      fuel: this.fuel,
      life: this.life,

    })

  }

  static getInfo(){

    var playerRef = database.ref("players");
     playerRef.on("value",(data)=>{

      allPlayers = data.val()


    });

  }

  get_dis(){

    var playerRef = database.ref ("players/player"+ this.index);
    playerRef.on ("value",(data)=>{

      var data = data.val()
      this.positionX = data.positionX
      this.positionY = data.positionY

    })

  }

  update(){

    var playerIndex = "players/player" + this.index;

    database.ref(playerIndex).update({

      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      fuel: this.fuel,
      life: this.life,

    })

  }

  getcarsend(){

    database.ref("carrosEnd").on("value", data =>{

      this.rank = data.val();

    })

  }

  static updaterank(rank){

    database.ref ("/").update({

      carrosEnd: rank,

    })

  }

}

