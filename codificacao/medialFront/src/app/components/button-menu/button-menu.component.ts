import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss']
})
export class ButtonMenuComponent implements OnInit{
  @Input() text : string | undefined;
  @Input() imagem: string | undefined = '';
  @Input() selecionado: boolean = false;
  @Input() notHr: boolean = false;

  ngOnInit(){
    this.imagem = '/assets/images/menu_icon/' + this.imagem + '.png';
  }
}
