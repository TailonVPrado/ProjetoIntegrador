import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModel } from 'src/app/models/interface/button.model';

@Component({
  selector: 'button-default',
  templateUrl: './button-default.component.html',
  styleUrls: ['./button-default.component.scss']
})
export class ButtonDefaultComponent {

  @Input() properties : ButtonModel | undefined;
  @Input() hint :string | undefined;
  @Output() onClick : EventEmitter<any> = new EventEmitter<any>();

  allowClick : boolean = true;

  click(event: Event){

    if(this.allowClick && !this.properties?.isRequesting){
      this.onClick.emit();

      this.allowClick = false;
      setTimeout(() => {//timeOut para impedir que o usuário fique espamando clicks nos botoes (esta configurado para no maximo 1 click por segundo)
        this.allowClick = true;
      }, 1000);
    }
  }
}
