class Game {
  constructor() {
    this.flagbot = 0;
    this.player = "X";
    this.move = 0;
    this.table = document.getElementById("table");
    this.fields = this.table.getElementsByTagName("div");
    this.scoreX = document.getElementById("X");
    this.scoreO = document.getElementById("O");
    this.scoreCountX = 0;
    this.scoreCountO = 0;
  };

  input(pos){
    let field = document.getElementById(`p${pos}`);
    if (field.innerText == ""){
      this.move++;
      field.innerText = this.player;
      this.player = (this.player == "X")?"O":"X";
      this.flagbot = this.flagbot == 1?0:1;
      if (this.flagbot == 1){
        setTimeout(() => bot.decideMove(), 500);
      }
    }
    // not possible to win within less than 5 movements
    if (this.move>=5) {
      //make checkwinner async
      setTimeout(() => this.checkWinner(), 50);}
    return;
  };

  checkWinner(){
    let fields = this.fields;
    //Check horizontals: iterate lines jumping every 3 indexes
    for(let i=0; i<=6; i+=3){
      let a = fields[i].innerText;
      let b = fields[i+1].innerText;
      let c = fields[i+2].innerText;
      if(a == b && b == c && a != ''){
        this.gameOver(this.player);
        return;
      }
    }
    //Check verticals: iterate over columns
    for(let i=0; i<=2; i++){
      let a = fields[i].innerText;
      let b = fields[i+3].innerText;
      let c = fields[i+6].innerText;
      if(a == b && b == c && a != ''){
        this.gameOver(this.player);
        return;
      }
    }
    //check diagonals:
    let a = fields[0].innerText;
    let b = fields[4].innerText;
    let c = fields[8].innerText;

    let d = fields[2].innerText;
    let e = fields[4].innerText;
    let f = fields[6].innerText;
    
    if(a == b && b == c){
      this.gameOver(this.player); 
      return; 
    }
    else if (d == e && e == f){
      this.gameOver(this.player);
      return;
    }
    //out of movements
    else if (this.move==9){
      this.gameOver(-1);
      return;
    }
  };

  gameOver(winner){
    if(winner!=-1){
      if (winner=='X'){
        this.scoreCountX++;
        this.scoreX.innerText =`X: ${this.scoreCountX}`;
      }
      else{
        this.scoreCountO++;
        this.scoreO.innerText =`O: ${this.scoreCountO}`
      }
      window.alert(`Congrats! ${winner} won!`);
    }
    else {window.alert("Nobody won :(");}
    setTimeout(() => this.again(), 500);
  };

  again(){
    for (let field of this.fields){field.innerText=""}
    this.move = 0;
  };

  reset(){
    this.scoreX.innerText = 'X: '
    this.scoreO.innerText = 'O: '
    this.scoreCountX = 0;
    this.scoreCountO = 0;
    this.again();
  }
};

var game = new Game();

class Bot{
  constructor(){
    this.winnables = {
      h1: [0, 1, 2],
      h2: [3, 4, 5],
      h3: [6, 7, 8],
      v1: [0, 3, 6],
      v2: [1, 4, 7],
      v3: [2, 5, 8],
      d1: [0, 4, 8],
      d2: [2, 4, 6],
  };
    this.scores = {
      h1: 0,
      h2: 0,
      h3: 0,
      v1: 0,
      v2: 0,
      v3: 0,
      d1: 0,
      d2: 0,
    };
  }
  
  updateTable(){
    this.botPlayer = game.player;
    this.emptyFields = this.searchTable("");
    this.myFields = this.searchTable(`${this.botPlayer}`);
    this.scores = {
      h1: 0,
      h2: 0,
      h3: 0,
      v1: 0,
      v2: 0,
      v3: 0,
      d1: 0,
      d2: 0,
    };
  }

  decideMove(){
    this.getScore();
    let maxValue = Math.max(...Object.values(this.scores));
    let key = Object.keys(this.scores).find(key => this.scores[key] === maxValue);
    console.log(maxValue, key);
    for(let index of this.winnables[key]){
      if (this.emptyFields.includes(index)){
        game.input(index);
        return;
      }
    }
  }  
  //searches for ${query} on table and returns with indexes
  searchTable(query){
    let results = [];
    for(let index in game.fields){
      if(game.fields[index].innerText == `${query}`){results.push(Number(index));}
    }
    return results;
  }

  getScore(){
    this.updateTable()
    for(let winnable of Object.values(this.winnables)){
      let key = Object.keys(this.winnables).find(key => this.winnables[key] === winnable);
        for (let index of winnable){
          //if mine +1, if enemy -1, if blank none
          if (this.myFields.includes(index))
            this.scores[key]++;
          else if (!(this.emptyFields.includes(index)))
            this.scores[key]--;
        }
      this.scores[key] = Math.abs(this.scores[key]);
    }
  }
};

var bot = new Bot();