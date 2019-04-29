/**this will contain all the logic for interaction between grid components */
import { Injectable } from '@angular/core';

@Injectable()
export class GridLogicService {

  private grid: string[][];

  constructor() { 
    console.log("Grid logic service constructed");
    this.initGrid();
  }

  //this function initializes all of the grid's logical values to empty
  private initGrid(){
    this.grid = [];
    for(let i: number  = 0; i < 30; i++){
      this.grid[i] = [];
      for(let j: number = 0; j < 20; j++){
        this.grid[i][j] = 'empty';
      }
    }
  }

  //this function takes input from the workspace to update the grid
  public updateGrid(x: number, y:number, value: string){
    this.grid[x-1][y-1] = value;
    console.log(x + "," + y + " updated to " + this.grid[x-1][y-1]);
  }
}
