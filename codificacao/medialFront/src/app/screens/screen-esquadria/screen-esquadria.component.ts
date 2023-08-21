import { Perfil } from './../../models/objetos/perfil.model';
import { LinhaService } from './../../services/linha.service';
import { tipoBotao } from './../../models/enum/tipoBotao.model';
import { Component, OnInit } from '@angular/core';
import { Esquadria } from 'src/app/models/objetos/esquadria.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { ButtonModel } from 'src/app/models/interface/button.model';

@Component({
  selector: 'screen-esquadria',
  templateUrl: './screen-esquadria.component.html',
  styleUrls: ['./screen-esquadria.component.scss']
})
export class ScreenEsquadriaComponent implements OnInit {

  constructor(public tipoBotao : tipoBotao,
              private linhaService: LinhaService) { }

  ngOnInit(): void {
    this.linhaService.getLinhas(null, null).subscribe(
      (linhas) => {
        linhas.forEach((linha) =>{
          this.linhasDisponiveis.set(linha.idLinha, linha.dsLinha);
        })
      }
    )
  }

  linhasDisponiveis : Map<number, string> = new Map<number, string>();
  esquadria : Esquadria = new Esquadria();
  inputDsPerfil = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDsLinha = new InputModel({label: 'Linha', placeholder: 'Linha'});
  buttonCadastrar: ButtonModel = new ButtonModel({  });
  buttonConsultar: ButtonModel = new ButtonModel({ label: 'Consultar' });

  gridEsquadria: Esquadria[] = [];

  linhaSelecionada(id: any, esquadria : Esquadria){
    if(id == null){
      esquadria.linha = new Linha();
    }else{
      this.linhaService.getLinhaById(id).subscribe(
        (linha) => { esquadria.linha = linha; }
        )
    }
  }

  onClickConsultar(){

  }

  onClickCadastrar(){

  }
}
