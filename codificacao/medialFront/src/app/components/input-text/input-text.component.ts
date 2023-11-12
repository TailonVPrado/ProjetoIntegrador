import { AfterContentInit, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Properties } from 'src/app/models/interface/properties.model';
import * as _ from 'lodash';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements DoCheck {

  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();
  @Input() properties: Properties | undefined;
  @Input() isGrid: boolean = false;
  @Input() itensDisponiveis: Map<number, string> = new Map<number, string>();//= new Map<number, string>();
  @Input() campoFormula : boolean = false;
  @Input() align : string = '';

  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  actualValue: any;
  @Input() set mxModel(val: any) {
    //usado para o campo de formula do sistema
    if(this.campoFormula){
      val = val.split(".").join(",");
    }

    this.actualValue = val;
    this.mxModelChange.emit(val);
  } get mxModel() {
    return this.actualValue;
  }

  /*variveis*/
  itens: { id: number, descricao: string }[] = [];
  itensExibicao: { id: number, descricao: string }[] = [];
  exibeSugestao: boolean = false;
  selectedItemIndex: number = -1;
  oldValue: string | any;
  alterouItem: boolean = false;
  itensDisponiveisOld : Map<number, string> = new Map<number, string>();


  onInput() {
    this.filtraItens();
  }

  ngDoCheck(): void {
    if(!_.isEqual(this.itensDisponiveis, this.itensDisponiveisOld)){
      this.itens = []
      for (const [key, value] of this.itensDisponiveis?.entries()) {
        this.itens.push({ id: key, descricao: value });
      }
      this.itensDisponiveisOld = _.cloneDeep(this.itensDisponiveis);

      this.itensExibicao = this.itens;
      this.filtraItens();
    }
  }

  filtraItens(){
    this.itensExibicao = this.itens.filter(item =>
      item.descricao?.toLowerCase().includes(this.actualValue?.toLowerCase())
    );
  }

  selecionarItem(item : any) {
    this.itemSelecionado.emit(item.id);
    this.alterouItem = true;
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.itensExibicao?.length > 0) {
      if(event.key != 'Tab'){
        this.exibeSugestao = true;
      }
      switch (event.key) {
        case 'ArrowDown':
          this.selectNextItem();
          break;
        case 'ArrowUp':
          this.selectPreviousItem();
          break;
        case 'Enter':
          if (this.selectedItemIndex >= 0 && this.selectedItemIndex < this.itensExibicao?.length) {
            this.selecionarItem(this.itensExibicao[this.selectedItemIndex]);
            this.exibeSugestao = false;
          }else if(this.itensExibicao?.length == 1){
            this.selecionarItem(this.itensExibicao[0]);
            this.exibeSugestao = false;
          }
          break;
        default:
          break;
      }
    }
  }

  private idxRowScrrol : number = -1;
  private pxScrool : number = 20;
  selectNextItem() {
    if (this.selectedItemIndex < this.itensExibicao?.length - 1) {
      this.selectedItemIndex++;
      const element = document.getElementById('sujestion') as HTMLElement;
      if (element) {
        this.idxRowScrrol = this.idxRowScrrol+1;
        console.log('selectNextItem: ',this.idxRowScrrol);
        if((this.idxRowScrrol >= 4 && this.pxScrool == 20) || this.idxRowScrrol >= 5 && this.pxScrool == 25){
          this.idxRowScrrol = 4;
          element.scrollTop += this.pxScrool;
          this.pxScrool = 25;
        }
      }
    }
  }

  selectPreviousItem() {
    if (this.selectedItemIndex > 0) {
      this.selectedItemIndex--;

      const element = document.getElementById('sujestion') as HTMLElement;
      if (element) {
        this.idxRowScrrol = this.idxRowScrrol-1;
        console.log('selectNextItem: ',this.idxRowScrrol);
        if((this.idxRowScrrol <= 0)){
          this.idxRowScrrol = 0;
          element.scrollTop -= 25;
          this.pxScrool = 20;
        }
      }
    }
  }

  onFocus($event : Event) {
    if(this.focus){
      this.focus.emit($event);
    }

    if (this.itens.length > 0) {
      setTimeout(() => {
        this.exibeSugestao = true;
        this.filtraItens();
      }, 300);
      this.oldValue = this.actualValue;
      this.alterouItem = false;
      this.selectedItemIndex = -1;
    }

  }

  onBlur($event : Event) {
    if(this.blur){
      this.blur.emit($event);
    }

    this.idxRowScrrol = -1
    if (this.itens.length > 0) {
      /*adicionado esse timeout para nao bugar caso o usuario escolha um item com o mouse (isso garente que o evento de click sera executado),
      e para garantir que o campo de sujestao abra sempre que o campo ganhar o foco foi adionado um timeout no on focus tbm*/

      setTimeout(() => {
        this.exibeSugestao = false;
      }, 300);

      if(this.actualValue?.length == 0){
        this.itemSelecionado.emit(null);
      }else if(!this.alterouItem && this.actualValue?.length != this.oldValue?.length){
        this.mxModelChange.emit(this.oldValue);
      }
    }
  }

}
