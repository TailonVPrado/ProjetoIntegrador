import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit{
  botoes : Map<string, any> = new Map<string, any>([
      ['botaoLinha', { imagem: 'linhas-menu', text: 'Linha', routerLink: '/linha', selecionado: false, childs: [] }],
      ['botaoPerfil', { imagem: 'perfil-menu', text: 'Perfil', routerLink: '/perfil', selecionado: false, childs: [] }],
      ['botaoEsquadria', { imagem: 'esquadrias-menu', text: 'Esquadrias', routerLink: '/esquadrias', selecionado: false, childs: [] }],
      ['botaoObra', { imagem: 'obras-menu', text: 'Obras', routerLink: '/obras', selecionado: false, childs: ['botaoObraCadastro', 'botaoObraConsulta'] }],
      ['botaoObraCadastro', { imagem: 'adicionar', text: 'Cadastrar', routerLink: '/obras/cadastro', selecionado: false, childs: []}],
      ['botaoObraConsulta', { imagem: 'consultar', text: 'Consultar', routerLink: '/obras/consulta', selecionado: false, childs: [] }],
      ['botaoCorte', { imagem: 'cortes-menu', text: 'Cortes', routerLink: '/cortes', selecionado: false, childs: [] }]
  ]);

  constructor() {}

  ngOnInit() {}

  onClick(buttonName: string) {
    for (const [chave, valor] of this.botoes.entries()) {
      if(chave == buttonName || valor.childs.includes(buttonName)){
        valor.selecionado = true;
      }else{
        valor.selecionado = false;
      }
    }
  }
}
