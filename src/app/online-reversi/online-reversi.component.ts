import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-reversi',
  templateUrl: './online-reversi.component.html',
  styleUrls: ['./online-reversi.component.css']
})
export class OnlineReversiComponent implements OnInit {

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

  //these values are currently defined; they will at some point be dynamic
  private width: number = 8;
  private height: number = 8;

  private blackScore = 2;
  private whiteScore = 2;


  constructor() { 
  }

  ngOnInit() {
  }

  ngAfterViewInit(){

  }

  //draw over the grid square according to selected tool
  private updateCellGraphics(x: number,y: number){
    let xcoord = (this.cellPixelWidth * (x));
    let ycoord = (this.cellPixelHeight * (y));

    let context = this.context;

    context.beginPath();
    context.rect(xcoord+3,ycoord+3,this.cellPixelWidth-5,this.cellPixelHeight-5);

    //context.fillStyle = this.getValue(x,y);

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

  //returns value of selected grid coordinate
  public getValue(x: number, y: number){
    //return this.grid[x][y];
  }
  

}
