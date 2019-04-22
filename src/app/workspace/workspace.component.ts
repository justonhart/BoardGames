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

  constructor(toolSelector: ToolSelectorService) { }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.createGrid();

    this.pos = canvasEl.getBoundingClientRect();
  }

  private createGrid() {

    var bw = 600;
    // Box height
    var bh = 600;
    // Padding
    var p = 0;

    var context = this.context;

    for (var x = 0; x <= bw; x += 30) {
      context.moveTo(0.5 + x + p, p);
      context.lineTo(0.5 + x + p, bh + p);
    }

    for (var y = 0; y <= bh; y += 30) {
      context.moveTo(p, 0.5 + y + p);
      context.lineTo(bw + p, 0.5 + y + p);
    }

    context.moveTo(600,600);
    context.lineTo(601,601);
    context.strokeStyle = "black";
    context.stroke();
  }

  private onClick(event){
    let x = (-1* Math.ceil((this.pos.left - event.clientX)/30) +1);
    let y = (-1 * Math.ceil((this.pos.top - event.clientY)/30) +1);

    console.log(x + "," + y);
    this.updateBlock(x,y);
  }

  private onRightClick(event){
    let x = (-1* Math.ceil((this.pos.left - event.clientX)/30) +1);
    let y = (-1 * Math.ceil((this.pos.top - event.clientY)/30) +1);

    console.log(x + "," + y);
    this.clearBlock(x,y);
  }

  private updateBlock(x: number,y: number): void{
    let xcoord = (30 * (x - 1));
    let ycoord = (30 * (y - 1));

    let context = this.context;

    context.beginPath();
    context.rect(xcoord+1,ycoord+1,29,29);
    context.fillStyle = "red";
    context.fill();
  }
  
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
