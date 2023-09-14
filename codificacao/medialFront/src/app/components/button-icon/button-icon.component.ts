import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent {
  @Input() visivel : boolean|undefined = false;
  @Input() nomeIcone : string | undefined;
  @Input() hint : string | undefined;
  @Input() notContainImageAtAddImagem : boolean = false;//usado para customizar botao de adicionar imagem na tela de PERFIL
  @Output() onClick : EventEmitter<any> = new EventEmitter<any>();

  click(event: Event){
    event.stopPropagation();
    this.onClick.emit();
  }
}
