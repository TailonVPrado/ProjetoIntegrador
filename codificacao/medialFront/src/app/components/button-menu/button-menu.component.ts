import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss']
})
export class ButtonMenuComponent{

  @Input() notHr: boolean = false;// notHr faz referencia a tag <HR>
  @Input() properties : any;

}
