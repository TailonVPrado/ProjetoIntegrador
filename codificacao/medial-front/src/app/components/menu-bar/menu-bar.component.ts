import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit{
  botoes: any[] = [
    { imagem: 'linhas-menu', text: 'Linha', routerLink: '/linha', selecionado: false},
    { imagem: 'perfil-menu', text: 'Perfil', routerLink: '/perfil', selecionado: false },
    { imagem: 'esquadrias-menu', text: 'Esquadrias', routerLink: '/esquadrias', selecionado: false },
    { imagem: 'descontos-menu', text: 'Descontos', routerLink: '/descontos', selecionado: false },
    { imagem: 'obras-menu', text: 'Obras', routerLink: '/obras', selecionado: false },
    { imagem: 'cortes-menu', text: 'Cortes', routerLink: '/cortes', selecionado: false }
  ];
  constructor() {}

  ngOnInit() {}

  isCLick(index: number) {
    this.botoes.forEach((botao, i) => {
        botao.selecionado = index === i;
    })
  }
}
