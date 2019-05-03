/**this will contain all the logic for interaction between grid components */
import { Injectable } from '@angular/core';

@Injectable()
export class ReversiLogicService {

  private grid: string[][];
  private turn: string;

  //these values are currently defined; they will at some point be dynamic
  private width: number = 8;
  private height: number = 8;

  private blackScore = 2;
  private whiteScore = 2;

  constructor() { 
    this.initGrid();
    this.turn = "black";
  }

  //this function initializes all of the grid's logical values to empty
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

  //this function takes input from the workspace to update the grid
  public updateGrid(x: number, y:number){
    this.grid[x][y] = this.turn;

    if(this.turn == "black")
      this.blackScore++;
    else
      this.whiteScore++;
  }

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

  private checkAxes(x: number, y:number): boolean{
    
    return this.checkLeft(x,y) || this.checkRight(x,y) || this.checkUp(x,y) || this.checkDown(x,y) || this.checkBottomLeft(x,y)
      || this.checkBottomRight(x,y) || this.checkTopRight(x,y) || this.checkTopLeft(x,y);

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

  public input(x: number, y: number){
    if(this.grid[x][y] == undefined && this.checkAxes(x,y)){
      this.updateGrid(x,y);
      this.updateAxes(x,y);
      this.toggleTurn();
    }
  }

  public toggleTurn(){
    if(this.turn == "white")
      this.turn = "black";
    else
      this.turn = "white";
  }

  private opponent(){
    let opponent;

    if(this.turn == "white")
      opponent = "black";
    else 
      opponent = "white";

    return opponent;
  }

  public getTurn(){
    return this.turn;
  }

  public printScores(){
    console.log ("Black: " + this.blackScore + "\nWhite: " + this.whiteScore);

    if(this.blackScore + this.whiteScore == 64)
      alert("Black: " + this.blackScore + "\nWhite: " + this.whiteScore);
  }
}
