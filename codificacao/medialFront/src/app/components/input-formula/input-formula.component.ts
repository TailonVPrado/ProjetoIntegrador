import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'input-formula',
  templateUrl: './input-formula.component.html',
  styleUrls: ['./input-formula.component.scss']
})
export class InputFormulaComponent {

  constructor() { }

  @Input() properties: Properties | undefined;
  @Input() isGrid: boolean = false;

  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  actualValue: any;
  @Input() set mxModel(val: any) {
    val = val.split(".").join(",");
    this.actualValue = val;
    this.mxModelChange.emit(val);
  }
  get mxModel() {
    return this.actualValue;
  }

  teclasDisponiveis = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                       'A', 'T', 'L', 'T',
                       '+', '-', '*', '/',
                       '(', ')', ',', '.',
                       'ARROWLEFT', 'ARROWRIGHT', 'ARROWUP', 'ARROWDOWN',
                       'PAGEUP', 'PAGEDOW', 'BACKSPACE', 'DELETE'];
  onKeyDown(event: KeyboardEvent) {
    if(!event.ctrlKey && !this.teclasDisponiveis.includes(event.key.toUpperCase())){
      event.preventDefault();
      return;
    }else if(event.ctrlKey && !['A' ,'ARROWLEFT', 'ARROWRIGHT', 'ARROWUP', 'ARROWDOWN', 'PAGEUP', 'PAGEDOW', 'BACKSPACE', 'DELETE'].includes(event.key.toUpperCase())){
      event.preventDefault();
      return;
    }
  }

}
