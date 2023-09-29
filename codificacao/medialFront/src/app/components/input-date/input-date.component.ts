import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {


  ngOnInit(): void {
  }
  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() properties: Properties | undefined;
  @Input() isGrid: boolean = false;
  @Input() decimal : boolean = false;
  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  actualValue: any;


  constructor(private localeService: BsLocaleService) { this.localeService.use('pt-br');  }


  @Input() set mxModel(val: any) {
    this.actualValue = val;
    this.mxModelChange.emit(val);
  } get mxModel() {
    return this.actualValue;
  }

  onBlur(){
    if(this.actualValue == "Invalid Date"){
      this.actualValue = new Date();
    }
  }

}
