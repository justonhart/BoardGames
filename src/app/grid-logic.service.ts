/**this will contain all the logic for interaction between grid components */
import { Injectable } from '@angular/core';

@Injectable()
export class GridLogicService {

  private grid: string[][];

  //these values are currently defined; they will at some point be dynamic
  public width: number = 8;
  public height: number = 8;

  constructor() { 
    console.log("Grid logic service constructed");
    this.initGrid();
  }

  //this function initializes all of the grid's logical values to empty
  private initGrid(){
    this.grid = [];
    for(let i: number  = 0; i < this.width; i++){
      this.grid[i] = [];
      for(let j: number = 0; j < this.height; j++){
        this.grid[i][j] = 'green';
      }
    }
  }

  //this function takes input from the workspace to update the grid
  public updateGrid(x: number, y:number, value: string){
    this.grid[x][y] = value;
    console.log(this.grid[x][y]);
    this.checkAxes(x,y,value);

  }

  //returns value of selected grid coordinate
  public getValue(x: number, y: number){
    return this.grid[x][y];
  }

  private checkAxes(x: number, y: number, value: string){
    this.checkAbove(x,y,value);
    this.checkBelow(x,y,value);
    this.checkLeft(x,y,value);
    this.checkRight(x,y,value);
  }

  private checkAbove(x: number, y: number, value: string){

    let t: boolean = false;

    for(let i = 0; i < y; i++){
      if(t)
        this.grid[x][i] = value;
      else if(this.grid[x][i] == value && !t){
        t = true;
      }
    }
  }

  private checkBelow(x:number, y: number, value: string){
    let t: boolean = false;

    for(let i = this.height-1; i > y; i--){
      if(t)
        this.grid[x][i] = value;
      else if(this.grid[x][i] == value && !t){
        t = true;
      }
    }
  }

  private checkLeft(x:number, y:number, value:string){
    let t: boolean = false;

    for(let i = 0; i < x; i++){
      if(t)
        this.grid[i][y] = value;
      else if(this.grid[i][y] == value && !t){
        t = true;
      }
    }
  }

  private checkRight(x: number, y:number, value:string){
    let t: boolean = false;

    for(let i = this.width-1; i > x; i--){
      if(t)
        this.grid[i][y] = value;
      else if(this.grid[i][y] == value && !t){
        t = true;
      }
    }
  }

  private checkTopRight(x: number, y: number, value:string){
    let t: boolean = false;

    for(let i = this.width-1; i > x; i--){
      if(t)
        this.grid[i][y] = value;
      else if(this.grid[i][y] == value && !t){
        t = true;
      }
    }
  }

}
