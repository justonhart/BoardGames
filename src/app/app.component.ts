import { Component, HostListener } from '@angular/core';
import {ToolSelectorService} from './tool-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'redsim';

  constructor(private toolSelector: ToolSelectorService){}

  @HostListener('document:keypress',['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    switch(event.key){
      case 'r':
        this.toolSelector.setTool('red');
        break;
    }
  }
}
