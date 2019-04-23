import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ToolSelectorService } from '../tool-selector.service';

@Component({
  selector: 'app-workspace',
  template: '<canvas #canvas (click)="onClick($event)" (dblclick)="onRightClick($event)"></canvas>',
  //styles: ['canvas { border: 1px solid #000; }']
})
export class WorkspaceComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width: number = 601;
  @Input() public height: number = 601;
  private context: CanvasRenderingContext2D;
  private pos;

  constructor(private toolSelector: ToolSelectorService) { }

  //Once the view initializes, create the workspace grid
  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.createGrid();

    this.pos = canvasEl.getBoundingClientRect();
  }

  //this method creates the grid
  private createGrid() {

    //pixel size of grid
    var width = 600;
    var height = 600;
    var padding = 0;

    //set the context for drawing
    var context = this.context;

    //create the vertical lines for grid
    for (var x = 0; x <= width; x += 30) {
      context.moveTo(0.5 + x + padding, padding);
      context.lineTo(0.5 + x + padding, height + padding);
    }

    // create the horizontal lines for grid
    for (var y = 0; y <= height; y += 30) {
      context.moveTo(padding, 0.5 + y + padding);
      context.lineTo(width + padding, 0.5 + y + padding);
    }

    //fills in the corner pixel
    context.moveTo(600,600);
    context.lineTo(601,601);

    //draw lines
    context.strokeStyle = "black";
    context.stroke();
  }

  //this is called by mouseclicks on the grid canvas, and calculates which block needs to be updated
  private onClick(event){

    //this gross formula converts mouse coordinates to grid location
    let x = (-1* Math.ceil((this.pos.left - event.clientX)/30) +1);
    let y = (-1 * Math.ceil((this.pos.top - event.clientY)/30) +1);

    console.log(x + "," + y);

    //this passes the coordinate to the function that draws
    this.updateBlock(x,y);
  }


  private onRightClick(event){

    //this gross formula converts mouse coordinates to grid location
    let x = (-1* Math.ceil((this.pos.left - event.clientX)/30) +1);
    let y = (-1 * Math.ceil((this.pos.top - event.clientY)/30) +1);

    console.log(x + "," + y);
    this.clearBlock(x,y);
  }

  //draw over the grid square according to selected tool
  private updateBlock(x: number,y: number): void{
    let xcoord = (30 * (x - 1));
    let ycoord = (30 * (y - 1));

    let context = this.context;

    context.beginPath();
    context.rect(xcoord+1,ycoord+1,29,29);
    context.fillStyle = this.toolSelector.getTool();
    context.fill();
  }
  
  //redraw white over the grid square
  private clearBlock(x: number,y: number): void{
    let xcoord = (30 * (x - 1));
    let ycoord = (30 * (y - 1));

    let context = this.context;

    context.beginPath();
    context.rect(xcoord+1,ycoord+1,29,29);
    context.fillStyle = "white";
    context.fill();
  }

}
