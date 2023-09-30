import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit{
  botoes : Map<string, any> = new Map<string, any>([
      ['botaoLinha', { imagem: 'linhas-menu', text: 'Linha', routerLink: '/linha', selecionado: false, principal: '' }],
      ['botaoPerfil', { imagem: 'perfil-menu', text: 'Perfil', routerLink: '/perfil', selecionado: false, principal: '' }],
      ['botaoEsquadria', { imagem: 'esquadrias-menu', text: 'Esquadrias', routerLink: '/esquadrias', selecionado: false, principal: '' }],
      ['botaoObra', { imagem: 'obras-menu', text: 'Obras', routerLink: '/obras', selecionado: false, principal: '' }],
      ['botaoObraCadastro', { imagem: 'adicionar', text: 'Cadastrar', routerLink: '/obras/cadastro', selecionado: false, principal: 'botaoObra' }],
      ['botaoObraConsulta', { imagem: 'consultar', text: 'Consultar', routerLink: '/obras/consulta', selecionado: false, principal: 'botaoObra' }],
      ['botaoCorte', { imagem: 'cortes-menu', text: 'Cortes', routerLink: '/cortes', selecionado: false, principal: '' }]
  ]);

  constructor() {}

  ngOnInit() {}

  onClick(buttonName: string) {
    for (const [chave, valor] of this.botoes.entries()) {
      if(chave == buttonName){
        valor.selecionado = true;
      }else{
        valor.selecionado = false;
      }
    }
  }
}
