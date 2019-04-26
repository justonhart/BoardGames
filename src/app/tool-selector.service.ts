/*The ToolSelectorService is what connects the toolbox selection to the workspace; grid graphics are created using the tool value selected in this service */
//defaults to redstone
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolSelectorService {
  private tool: string = 'red';
  constructor() { }

  //this returns the tool value selected
  public getTool(){
    return this.tool;
  }

  //this allows the toolbox/HostListener to set the tool
  public setTool(selection){
    this.tool = selection;
  }
}
