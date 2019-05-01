import { Component, HostListener } from '@angular/core';
import {ToolSelectorService} from './tool-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Board Games';

  constructor(private toolSelector: ToolSelectorService){}
}
