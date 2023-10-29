import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() properties: Properties | undefined;

  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  actualValue: any;
  @Input() set mxModel(val: any) {
    this.actualValue = val;
    this.mxModelChange.emit(val);
  } get mxModel() {
    return this.actualValue;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
