class Game {
  constructor() {
    this.player = "X"; //user is always X and starts playing
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
      field.innerText = this.player;
      this.move++;
      //check winner and toggle player asynchronously
      setTimeout(() =>{
        // not possible to win within less than 5 movements
        if (this.move>=5 && this.checkWinner()) 
          return;
        this.player = (this.player == "X")?"O":"X";
        if (this.player=="O"){bot.decideMove()}; 
        }, 400); //400ms delay for UX
    }
    return;
  };

  checkWinner(){
    let fields = this.fields;
    //Check horizontals: iterate lines jumping every 3 indexes
    for(let i=0; i<=6; i+=3){
      let hn1 = fields[i].innerText;
      let hn2 = fields[i+1].innerText;
      let hn3 = fields[i+2].innerText;
      if(hn1 == hn2 && hn2 == hn3 && hn1 != ''){
        this.gameOver(this.player);
        setTimeout(() => this.again(), 500);
        return true;
      }
    }
    //Check verticals: iterate over columns
    for(let i=0; i<=2; i++){
      let vn1 = fields[i].innerText;
      let vn2 = fields[i+3].innerText;
      let vn3 = fields[i+6].innerText;
      if(vn1 == vn2 && vn2 == vn3 && vn1 != ''){
        this.gameOver(this.player);
        setTimeout(() => this.again(), 500);
        return true;
      }
    }
    //check diagonals:
    let d11 = fields[0].innerText;
    let d12 = fields[4].innerText;
    let d13 = fields[8].innerText;

    let d21 = fields[2].innerText;
    let d22 = fields[4].innerText;
    let d23 = fields[6].innerText;
    
    if(d11 == d12 && d12 == d13){
      this.gameOver(); 
      setTimeout(() => this.again(), 500);
      return true;
    }
    else if (d21 == d22 && d22 == d23){
      this.gameOver();
      setTimeout(() => this.again(), 500);
      return true;
    }
    //out of movements
    else if (this.move==9){
      this.gameOver(-1);
      setTimeout(() => this.again(), 500);
      return true;
    }
    return false;
  };

  gameOver(winner=this.player){
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
    this.botPlayer = "O";
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
    this.updateTable();
    if(game.move<=2){ //play randomly in first movements to generate pseudo-aleatory outcomes
      let randomEmpty = this.emptyFields[Math.floor(Math.random() * this.emptyFields.length)]
      game.input(randomEmpty)
      return;
    }
    this.getScore();
    let maxValue = Math.max(...Object.values(this.scores));
    let maxKeys = Object.keys(this.scores).filter(key => this.scores[key] === maxValue); //array with one or more keys to the maximum(s) score(s)
    //iterate through all keys with maximum score, in case of a tie
    for (let keyIndex = 0; keyIndex <= maxKeys.length; keyIndex++){
      for(let index of this.winnables[maxKeys[keyIndex]]){
        if (this.emptyFields.includes(index)){ //plays on first empty field, respecting given conditions
          game.input(index);
          return;
        }
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