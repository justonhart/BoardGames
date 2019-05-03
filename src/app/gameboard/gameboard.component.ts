import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ToolSelectorService } from '../tool-selector.service';
import { ReversiLogicService } from '../reversi-logic.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  providers: [ReversiLogicService],
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements AfterViewInit {

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
  private turn;

  private context: CanvasRenderingContext2D;

  constructor(private toolSelector: ToolSelectorService, private reversiLogic: ReversiLogicService) { }

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


    this.reversiLogic.input(x,y);
    this.updateGridGraphics();
    this.reversiLogic.printScores();
  }

  //draw over the grid square according to selected tool
  private updateCellGraphics(x: number,y: number){
    let xcoord = (this.cellPixelWidth * (x));
    let ycoord = (this.cellPixelHeight * (y));

    let context = this.context;

    context.beginPath();
    context.rect(xcoord+3,ycoord+3,this.cellPixelWidth-5,this.cellPixelHeight-5);

    context.fillStyle = this.reversiLogic.getValue(x,y);

    context.fill();
  }

  private updateGridGraphics(){
    for(let x = 0; x < this.gridCellWidth; x++){
      for(let y = 0; y < this.gridCellHeight; y++){
        if(this.reversiLogic.getValue(x,y) !== undefined)
          this.updateCellGraphics(x,y);
      }
    }

    this.turn = this.reversiLogic.getTurn();
  }

  private pass(){
    this.reversiLogic.toggleTurn();
    this.turn = this.reversiLogic.getTurn();
  }
}
