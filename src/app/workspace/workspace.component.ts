import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements AfterViewInit {
  
  buttonText: number = 2;

  constructor() { }

  ngAfterViewInit() {
  }

  onClick(): void{
    this.buttonText++;
  }

  onDoubleClick(): void{
    console.log('DOUBLE');
  }
}
