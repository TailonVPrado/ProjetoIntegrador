import { tipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { LinhaService } from './../../services/linha.service';
import { Component } from '@angular/core';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'screen-linha',
  templateUrl: './screen-linha.component.html',
  styleUrls: ['./screen-linha.component.scss']
})
export class ScreenLinhaComponent {

  constructor(
    private linhaService: LinhaService,
    public tipoBotao: tipoBotao,
    private generic: GenericService) { }

  linha: Linha = new Linha();
  inputDescricao: InputModel = new InputModel({ label: "Descrição", placeholder: "insira a descrição" });
  buttonCadastrar: ButtonModel = new ButtonModel({ label: '+ Adicionar Linha' });
  buttonConsultar: ButtonModel = new ButtonModel({ label: 'Consultar' });

  gridLinhas: Linha[] = [];
  botoesGrid: Map<string, boolean> | undefined;

  onClickSalvar(): void {
    this.linhaService.createLinha(this.linha).subscribe(
      (response) => {
        console.log("sucess", response);
        this.linha.dsLinha = '';
        this.carregarLinhas();
      },
      (error) => {
        console.log('erro', error.error.errors[0]);
      }
    );
  }

  carregarLinhas() {
    this.linhaService.getLinhas().subscribe(
      (linhas) => {
        linhas.forEach((linha, i) => {
          this.gridLinhas[i] = linha;
          this.gridLinhas[i].properties = new Properties({ ativo: false });
          this.gridLinhas[i].visibilidadeBotoes = new Map<string, boolean>([
            [this.tipoBotao.CANCELAR, false],
            [this.tipoBotao.CONFIRMAR, false],
            [this.tipoBotao.EDITAR, true],
            [this.tipoBotao.EXCLUIR, true]
          ]);
        });
        // this.gridLinhas = linhas;
      },
      (error) => {
        console.error('Erro ao carregar linhas:', error);
      }
    );
  }

  vetItem: any[] | any = [];


  consultaItemSimilar() {
    console.log('teste');
  }

  buscarItensSimilares() {
    // todo mudar primeiro parametro que é a empresa
    this.linhaService.getLinhasByDescricao(1, this.linha.dsLinha).subscribe(
      (linhas) => {

        this.vetItem = [];
        for (var x of linhas) {
          this.vetItem.push(x.dsLinha);
        }
        console.log(this.vetItem);
      },
      (error) => {
        console.error('Erro ao carregar linhas:', error);
      }
    );
  }

  onClickEditar(linha : Linha){
    linha.visibilidadeBotoes.set(this.tipoBotao.EDITAR, false);
    linha.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, false);
    linha.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, true);
    linha.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, true);
    linha.properties.ativo = true;
  }
  onClickExcluir(linha : Linha){
    linha.visibilidadeBotoes.set(this.tipoBotao.EDITAR, false);
    linha.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, false);
    linha.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, true);
    linha.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, true);
  }
  onClickCancelar(linha : Linha){
    linha.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
    linha.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
    linha.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
    linha.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
    linha.properties.ativo = false;

  }
  onClickConfirmar(linha : Linha){
    linha.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
    linha.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
    linha.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
    linha.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
    linha.properties.ativo = false;

  }
  async showMessage(){
    this.generic.showError('titulo');
    this.generic.showInformation('titulo');
    this.generic.showSuccess('titulo');
    this.generic.showWarning('titulo');
    console.log('antes');
   console.log('teste: ', await this.generic.showAlert('teste'));
    console.log('depois ');
  }
}
