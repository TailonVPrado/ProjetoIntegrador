import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    //precisa esse timeout, porque sem ele por algum motivo o INPUT itensSimilares ainda esta sem valores e isso faz com que nao carregue a lista
    setTimeout(() => {
      console.log('after');
      for (const [key, value] of this.itensSimilares?.entries()) {
        this.itens.push({ id: key, descricao: value });
      }
      this.itensExibicao = this.itens;
    }, 100);
    // if (this.itens.length > 0 && this.itens.length < 20) {
    // this.itensExibicao = this.itens;
    // }
  }
  itens: { id: number, descricao: string }[] = [];
  itensExibicao: { id: number, descricao: string }[] = [];
  exibeSugestao: boolean = false;
  selectedItemIndex: number = -1;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() properties: Properties | undefined;
  @Input() isGrid: boolean = false;
  @Input() itensSimilares: Map<number, string> = new Map<number, string>();//= new Map<number, string>();
  @Output() mxModelChange: EventEmitter<any> = new EventEmitter<any>();
  actualValue: any;
  @Input() set mxModel(val: any) {
    this.actualValue = val;
    this.mxModelChange.emit(val);
  } get mxModel() {
    return this.actualValue;
  }

  onInput() {
    this.itensExibicao = this.itens.filter(item =>
      item.descricao.toLowerCase().includes(this.actualValue.toLowerCase())
    );
    console.log(this.itensExibicao);
  }

  selecionarItem(val: any) {
    console.log('selecionarItem', val);
  }


  onKeyDown(event: KeyboardEvent) {
    console.log(event.key)
    if (this.itensExibicao?.length > 0) {
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
          }
          break;
        default:
          break;
      }
    }
  }

  selectNextItem() {
    if (this.selectedItemIndex < this.itensExibicao?.length - 1) {
      this.selectedItemIndex++;
    }
  }

  selectPreviousItem() {
    if (this.selectedItemIndex > 0) {
      this.selectedItemIndex--;
    }
  }

  onFocus() {

    if (this.itens.length > 0) {
      setTimeout(() => {
        this.exibeSugestao = true;
      }, 300);
    }
  }

  onBlur() {
    if (this.itens.length > 0) {
      /*adicionado esse timeout para nao bugar caso o usuario escolha um item com o mouse (isso garente que o evento de click sera executado),
      e para garantir que o campo de sujestao abra sempre que o campo ganhar o foco foi adionado um timeout no on focus tbm*/
      setTimeout(() => {
        this.exibeSugestao = false;
      }, 300);
    }
  }

}
