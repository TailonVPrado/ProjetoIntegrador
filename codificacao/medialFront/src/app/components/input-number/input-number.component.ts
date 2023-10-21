import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.maskOptions = {
      prefix: "",
      suffix: "",
      thousands: "",
      decimal: ",",
      precision: this.decimal ? 1 : 0,
      allowNegative: true,
      allowZero: true,
      nullable: true,
      align: this.align,
      inputMode: CurrencyMaskInputMode.NATURAL,
    };
  }

  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() properties: Properties | undefined;
  @Input() isGrid: boolean = false;
  @Input() decimal : boolean = false;
  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() align : string = 'right';

  actualValue : any;
  maskOptions : any;

  @ViewChild('inputElement') inputElement : ElementRef | any;


  @Input() set mxModel(val: any) {
    this.actualValue = val;
    this.mxModelChange.emit(val);
  } get mxModel() {
    return this.actualValue;
  }

  onFocus(){
    this.inputElement.nativeElement.select();
  }
}
