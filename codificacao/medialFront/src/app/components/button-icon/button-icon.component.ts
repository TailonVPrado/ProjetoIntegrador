import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent {
  @Input() visivel : boolean|undefined = false;
  @Input() nomeIcone : string | undefined;
  @Input() formatoImagem : string = 'png';
  @Input() hint : string | undefined;
  @Input() notContainImageAtAddImagem : boolean = false;//usado para customizar botao de adicionar imagem na tela de PERFIL
  @Output() onClick : EventEmitter<any> = new EventEmitter<any>();

  allowClick : boolean = true;

  click(event: Event){
    if(this.allowClick){
      event.stopPropagation();
      this.onClick.emit();

      this.allowClick = false;
      setTimeout(() => {//timeOut para impedir que o usuário fique espamando clicks nos botoes (esta configurado para no maximo 1 click por segundo)
        this.allowClick = true;
      }, 1000);
    }
  }
}
