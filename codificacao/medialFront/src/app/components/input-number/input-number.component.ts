import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() properties: Properties | undefined;
  @Input() isGrid: boolean = false;
  @Input() decimal : boolean = false;
  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() align : string = '';

  actualValue: any;

  @Input() set mxModel(val: any) {
    this.actualValue = val;
    this.mxModelChange.emit(val);
  } get mxModel() {
    return this.actualValue;
  }
}
