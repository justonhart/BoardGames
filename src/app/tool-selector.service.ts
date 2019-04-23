import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolSelectorService {
  tool: string;
  constructor() { }

  public getTool(){
    return this.tool;
  }

  public setTool(selection){
    this.tool = selection;
  }
}
