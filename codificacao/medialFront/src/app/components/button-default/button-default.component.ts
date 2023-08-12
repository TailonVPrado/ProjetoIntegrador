import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModel } from 'src/app/models/interface/button.model';

@Component({
  selector: 'button-default',
  templateUrl: './button-default.component.html',
  styleUrls: ['./button-default.component.scss']
})
export class ButtonDefaultComponent {

  @Input() properties : ButtonModel | undefined;

  @Output() onClick = new EventEmitter<string>();
  onClickButton(){
    this.onClick.emit();
  }



}
