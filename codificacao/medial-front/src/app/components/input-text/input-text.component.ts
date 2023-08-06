import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { InputModel } from 'src/app/models/interface/input.model';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnChanges{

  @Input() properties : InputModel | undefined;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() itensSimilares: any[] = [];
  @Input() isGrid: boolean = false;

  @Output()mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  actualValue : any;
  @Input() set mxModel(val: any) {
    this.actualValue = val;
    console.log(val);
    this.mxModelChange.emit(val);
  }get mxModel() {
    return this.actualValue;
  }


  @Output() consultaItemSimilar: EventEmitter<any> = new EventEmitter<any>();
  private timeout: any;
  onInput() {
    if(this.actualValue){
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.consultaItemSimilar.emit();
      }, 500);
    }
  }



  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit();
  }

  selecionarItem(val : any){
    console.log('selecionarItem');
  }
  selectedItemIndex: number = -1;

  onKeyDown(event: KeyboardEvent) {
    console.log(event.key)
    if (this.itensSimilares.length > 0) {
      switch (event.key) {
        case 'ArrowDown':
          this.selectNextItem();
          break;
        case 'ArrowUp':
          this.selectPreviousItem();
          break;
        case 'Enter':
          if (this.selectedItemIndex >= 0 && this.selectedItemIndex < this.itensSimilares.length) {
            this.selecionarItem(this.itensSimilares[this.selectedItemIndex]);
          }
          break;
        default:
          break;
      }
    }
  }

  selectNextItem() {
    if (this.selectedItemIndex < this.itensSimilares.length - 1) {
      this.selectedItemIndex++;
    }
  }

  selectPreviousItem() {
    if (this.selectedItemIndex > 0) {
      this.selectedItemIndex--;
    }
  }

}
