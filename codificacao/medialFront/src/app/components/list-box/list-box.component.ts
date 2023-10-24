import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss']
})
export class ListBoxComponent implements OnInit {

  constructor() { }

  @Input() isGrid: boolean = false;
  @Input() properties: Properties | undefined;
  @Input() list : string[] = []
  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();

  actualValue: any;
  @Input()
  set mxModel(val: any) {
    this.mxModelChange.emit(val);
    this.actualValue = val;
  }
  get mxModel() {
    return this.actualValue;
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.actualValue = event.target!.value;
    this.mxModelChange.emit(this.actualValue);
  }
}
