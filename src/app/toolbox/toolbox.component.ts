/**The toolbox is the container which houses the different tools for the user. Clicking on a tool in the toolbox or using the correlated hotkey will change
 * the outcome of clicking on the grid.
 */

import { Component, OnInit } from '@angular/core';
import { ToolSelectorService } from '../tool-selector.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {


  constructor(private toolSelector: ToolSelectorService) {}

  ngOnInit() {
    
  }

  //this function interfaces with the ToolSelector service when a button is pressed
  choose(tool: string){
    this.toolSelector.setTool(tool);
  }

}
