import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.scss']
})
export class InputDateRangeComponent implements OnInit {

  ngOnInit(): void {
  }
  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() properties: Properties | undefined;
  @Input() isGrid: boolean = false;
  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  actualValue: any;


  constructor(private localeService: BsLocaleService) {
    this.localeService.use('pt-br');
    this.mxModel = [new Date(), new Date()];
  }


  @Input() set mxModel(val: any[]) {
    this.actualValue = val;
    this.mxModelChange.emit(val);
  } get mxModel() {
    return this.actualValue;
  }


}
