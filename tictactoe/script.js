class Game {
  constructor() {
    this.player = "";
    this.move = 0;
    this.table = document.getElementById("table");
    this.fields = this.table.getElementsByTagName("div");
    this.scoreX = document.getElementById("X");
    this.scoreY = document.getElementById("Y");
    this.scoreCountX = 0;
    this.scoreCountY = 0;
  };

  input(pos){
    let field = document.getElementById(`p${pos}`);
    if (field.innerText == ""){
      this.player = (this.player=="X")?"O":"X";
      this.move++;
      field.innerText = this.player;
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
      console.log(`diagonal 1`)
      this.gameOver(this.player); 
      return; 
    }
    else if (d == e && e == f){
      console.log(`diagonal 2`)
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
        this.scoreCountY++;
        this.scoreY.innerText =`Y: ${this.scoreCountY}`
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
    this.scoreY.innerText = 'Y: '
    this.scoreCountX = 0;
    this.scoreCountY = 0;
    this.again();
  }
};

var play = new Game();