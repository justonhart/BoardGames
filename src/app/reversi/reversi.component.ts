import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reversi',
  templateUrl: './reversi.component.html',
  providers: [],
  styleUrls: ['./reversi.component.css']
})
export class ReversiComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  //the width of each cell in the grid
  private cellPixelWidth = 80;
  private cellPixelHeight = 80;

  //the number of cells wide and high
  private gridCellWidth = 8;
  private gridCellHeight = 8;

  //divide these values by 30 to get the size of the grid in blocks
  private gridPixelWidth: number = (this.cellPixelWidth * this.gridCellWidth) + 1;
  private gridPixelHeight: number = (this.cellPixelHeight * this.gridCellHeight) + 1;
  
  private padding = 12;
  private turn = "black";

  private context: CanvasRenderingContext2D;

  private grid: string[][];

  //these values are currently defined; they will at some point be dynamic
  private width: number = 8;
  private height: number = 8;

  private blackScore = 2;
  private whiteScore = 2;


  constructor() {
    this.initGrid();
   }

  //Once the view initializes, create the workspace grid
  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');

    canvasEl.width = this.gridPixelWidth;
    canvasEl.height = this.gridPixelHeight;

    this.createGrid();
    this.updateGridGraphics();
  }

  //this method creates the grid
  private createGrid() {

    //pixel size of grid
    var width = this.gridPixelWidth - 1;
    var height = this.gridPixelHeight - 1;

    //set the context for drawing
    var context = this.context;

    //draw background
    context.moveTo(0,0);
    context.rect(0,0,this.gridPixelWidth,this.gridPixelHeight);
    context.fillStyle = "green";
    context.fill();

    //create the vertical lines for grid
    for (var x = 0; x <= width; x += this.cellPixelWidth) {
      context.moveTo(0.5 + x, 0);
      context.lineTo(0.5 + x, height);
    }

    // create the horizontal lines for grid
    for (var y = 0; y <= height; y += this.cellPixelHeight) {
      context.moveTo(0, 0.5 + y);
      context.lineTo(width, 0.5 + y);
    }

    //fills in the corner pixel
    context.moveTo(this.gridPixelWidth-1,this.gridPixelHeight-1);
    context.lineTo(this.gridPixelWidth,this.gridPixelHeight);

    //draw lines
    context.strokeStyle = "black";
    context.stroke();
  }

  //this is called by mouseclicks on the grid canvas, and calculates which block needs to be updated
  private onClick(event){

    var rect = event.target.getBoundingClientRect();
    //this gross formula converts mouse coordinates to grid location
    let x = (-1* Math.ceil((rect.left - event.pageX + this.padding)/this.cellPixelWidth));
    let y = (-1 * Math.ceil((rect.top - event.pageY + this.padding)/this.cellPixelHeight));


    this.input(x,y);
    this.printScores();
  }

  //draw over the grid square according to selected tool
  private updateCellGraphics(x: number,y: number){
    let xcoord = (this.cellPixelWidth * (x));
    let ycoord = (this.cellPixelHeight * (y));

    let context = this.context;

    context.beginPath();
    context.rect(xcoord+3,ycoord+3,this.cellPixelWidth-5,this.cellPixelHeight-5);

    context.fillStyle = this.getValue(x,y);

    context.fill();
  }

  //updates the graphics for the entire grid
  private updateGridGraphics(){
    for(let x = 0; x < this.gridCellWidth; x++){
      for(let y = 0; y < this.gridCellHeight; y++){
        if(this.getValue(x,y) !== undefined)
          this.updateCellGraphics(x,y);
      }
    }
  }

  //creates the grid initially
  private initGrid(){
    this.grid = [];
    for(let i: number  = 0; i < this.width; i++){
      this.grid[i] = [];
      for(let j: number = 0; j < this.height; j++){
        this.grid[i][j] = undefined;
      }
    }

    this.grid[3][3] = "white";
    this.grid[4][3] = "black";
    this.grid[3][4] = "black";
    this.grid[4][4] = "white";
  }

  //updates grid memory and score
  public updateGrid(x: number, y:number){
    this.grid[x][y] = this.turn;

    if(this.turn == "black")
      this.blackScore++;
    else
      this.whiteScore++;
  }

  //changes score when pieces are captured
  private capture(){
    if(this.turn == "black"){
      this.blackScore++;
      this.whiteScore--;
    }
    else{
      this.whiteScore++;
      this.blackScore--;
    }
  }

  //returns value of selected grid coordinate
  public getValue(x: number, y: number){
    return this.grid[x][y];
  }

  //draws updates to boardstate
  private updateAxes(x: number, y: number){
    //right
    if(this.checkRight(x,y)){
      for(let i = x+1; i < this.width && this.grid[i][y] == this.opponent(); i++){
        this.grid[i][y] = this.turn;
        this.capture();
      }
    }

    //up
    if(this.checkUp(x,y)){
      for(let i = y-1; i > 0 && this.grid[x][i] == this.opponent(); i--){
        this.grid[x][i] = this.turn;
        this.capture();
      }
    }

    //left
    if(this.checkLeft(x,y)){
      for(let i = x-1; i > 0 && this.grid[i][y] == this.opponent(); i--){
        this.grid[i][y] = this.turn;
        this.capture();
      }
    }

    //down
    if(this.checkDown(x,y)){
      for(let i = y+1; i < this.height && this.grid[x][i] == this.opponent(); i++){
        this.grid[x][i] = this.turn;
        this.capture();
      }
    }

    //topright
    if(this.checkTopRight(x,y)){
      let maxDistance = Math.min(this.width -1 - x, y);
      for(let i = 1; i <= maxDistance && this.grid[x+i][y-i] == this.opponent(); i++){
        this.grid[x+i][y-i] = this.turn;
        this.capture();
      }
    }

    //topleft
    if(this.checkTopLeft(x,y)){
      let maxDistance = Math.min(x, y);
      for(let i = 1; i <= maxDistance && this.grid[x-i][y-i] == this.opponent(); i++){
        this.grid[x-i][y-i] = this.turn;
        this.capture();
      }
    }

    //bottomleft
    if(this.checkBottomLeft(x,y)){
      let maxDistance = Math.min(x, this.height -1 -y);
      for(let i = 1; i <= maxDistance && this.grid[x-i][y+i] == this.opponent(); i++){
        this.grid[x-i][y+i] = this.turn;
        this.capture();
      }
    }

    //bottomright
    if(this.checkBottomRight(x,y)){
      let maxDistance = Math.min(this.width -1 - x, this.width -1 -y);
      for(let i = 1; i <= maxDistance && this.grid[x+i][y+i] == this.opponent(); i++){
        this.grid[x+i][y+i] = this.turn;
        this.capture();
      }
    }
  }

  private checkLegality(x: number, y:number): boolean{
    
    return this.grid[x][y] == undefined && (this.checkLeft(x,y) || this.checkRight(x,y) || this.checkUp(x,y) || this.checkDown(x,y) || this.checkBottomLeft(x,y)
      || this.checkBottomRight(x,y) || this.checkTopRight(x,y) || this.checkTopLeft(x,y));

  }

  private checkLeft(x: number, y:number): boolean{
    for(let i = x-2; i >= 0; i--){
      if(this.grid[i][y] === undefined)
        return false;
      if(this.grid[i][y] == this.turn && this.grid[x-1][y] == this.opponent())
        return true;
    }

    return false;
  }

  private checkRight(x: number, y:number): boolean{
    for(let i = x+2; i < this.width; i++){
      if(this.grid[i][y] === undefined)
        return false;
      if(this.grid[i][y] == this.turn && this.grid[x+1][y] == this.opponent())
        return true;
    }

    return false;
  }

  private checkUp(x: number, y: number): boolean{
    //check up
    for(let i = y-2; i >= 0; i--){
      if(this.grid[x][i] === undefined)
        return false;
      if(this.grid[x][i] == this.turn && this.grid[x][y-1] == this.opponent())
        return true;
    }

    return false;
  }

  private checkDown(x: number, y: number): boolean{
    for(let i = y+2; i < this.height; i++){
      if(this.grid[x][i] === undefined)
        return false;
      if(this.grid[x][i] == this.turn && this.grid[x][y+1] == this.opponent())
        return true;
    }

    return false;
  }

  private checkTopLeft(x:number, y: number): boolean{
    let maxDistance = Math.min(x, y);
    for(let i = 2; i <= maxDistance; i++){
      if(this.grid[x-i][y-i] === undefined)
        return false;
      if(this.grid[x-i][y-i] == this.turn && this.grid[x-1][y-1] == this.opponent())
        return true;
    }

    return false;
  }

  private checkTopRight(x: number, y: number): boolean{
    let maxDistance = Math.min(this.width -1 - x, y);
    for(let i = 2; i <= maxDistance; i++){
      if(this.grid[x+i][y-i] === undefined)
        return false;
      if(this.grid[x+i][y-i] == this.turn && this.grid[x+1][y-1] == this.opponent())
        return true;
    }

    return false;
  }

  private checkBottomRight(x: number, y: number): boolean{
    let maxDistance = Math.min(this.width -1 - x, this.height -1 -y);
    for(let i = 2; i <= maxDistance; i++){
      if(this.grid[x+i][y+i] === undefined)
        return false;
      if(this.grid[x+i][y+i] == this.turn && this.grid[x+1][y+1] == this.opponent())
        return true;
    }

    return false;
  }

  private checkBottomLeft(x: number, y: number): boolean{
    let maxDistance = Math.min(x, this.height -1 -y);
    for(let i = 2; i <= maxDistance; i++){
      if(this.grid[x-i][y+i] === undefined)
        return false;
      if(this.grid[x-i][y+i] == this.turn && this.grid[x-1][y+1] == this.opponent())
        return true;
    }

    return false;
  }

  //runs checks on the grid space clicked to determine if it is a legal move, and makes the move if so
  private input(x: number, y: number){
    if(this.checkLegality(x,y)){
      this.updateGrid(x,y);
      this.updateAxes(x,y);
      this.updateGridGraphics();
      this.toggleTurn();
    }
  }

  //switches the turn value
  private toggleTurn(){
    if(this.turn == "white")
      this.turn = "black";
    else
      this.turn = "white";

    setTimeout(() => {this.countAvailableMoves();}, 1500);
  }

  //returns the opponent relative to current turn
  private opponent(){
    let opponent;

    if(this.turn == "white")
      opponent = "black";
    else 
      opponent = "white";

    return opponent;
  }

  //this prints score changes to the console, and alerts when the game ends
  private printScores(){
    console.log ("Black: " + this.blackScore + "\nWhite: " + this.whiteScore);

    if(this.blackScore + this.whiteScore == 64){
      if(this.blackScore > this.whiteScore){
        setTimeout(()=>{
          alert("Black: " + this.blackScore + "\nWhite: " + this.whiteScore + "\n\n Black wins!");
        }, 250);
      }
      else if(this.blackScore < this.whiteScore){
        setTimeout(()=>{
          alert("Black: " + this.blackScore + "\nWhite: " + this.whiteScore + "\n\n White wins!");
        }, 250);
      }
      else{
        setTimeout(()=>{
          alert("Black: " + this.blackScore + "\nWhite: " + this.whiteScore + "\n\n It's a tie!");
        }, 250);
      }
    }
  }

  //checks each space on the board for move legality, and prints the number of available moves to console. If none exist, alerts and passes turn
  private countAvailableMoves(){

    let available = 0;

    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        if(this.checkLegality(i,j)){
          available++;
        }
      }
    }

    if(available === 0 && this.blackScore + this.whiteScore < 64){
      
      alert(this.turn + " has no available moves. Passing turn");
      this.toggleTurn();
    }
    else{
      console.log("Available moves: " + available);
    }
  }


}
