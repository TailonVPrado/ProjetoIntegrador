import { LinhaService } from './../../services/linha.service';
import { Component, OnInit } from '@angular/core';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'screen-linha',
  templateUrl: './screen-linha.component.html',
  styleUrls: ['./screen-linha.component.scss']
})
export class ScreenLinhaComponent implements OnInit{

  constructor(
    private linhaService: LinhaService,
    public tipoBotao: TipoBotao,
    private generic: GenericService) { }

  ngOnInit(): void {
    this.carregarLinhas();
  }

  linha: Linha = new Linha();
  inputDescricao: InputModel = new InputModel({ label: "Descrição", placeholder: "insira a descrição" });
  buttonCadastrar: ButtonModel = new ButtonModel({  });
  buttonConsultar: ButtonModel = new ButtonModel({ label: 'Consultar' });

  gridLinhas: Linha[] = [];

  onClickSalvar(): void {
    this.buttonCadastrar.isRequesting = true;
    this.linhaService.createLinha(this.linha).subscribe(
      (response) => {
        this.generic.showSuccess("Linha ("+this.linha.dsLinha.trim()+") cadastrada com sucesso!");
        this.linha.dsLinha = '';
        this.carregarLinhas();
      },
      (error) => {
        this.generic.showError(error.error?.errors);
      }
    ).add(() =>{
      this.buttonCadastrar.isRequesting = false;
    });;
  }
  onClickConsultar(){
    this.carregarLinhas();
  }

  carregarLinhas() {
    //todo alterar o 1 para ser por empresa
    this.buttonConsultar.isRequesting = true;
    this.linhaService.getLinhas(1, this.linha.dsLinha).subscribe(
      (linhas) => {
        this.gridLinhas = []
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
        if(this.gridLinhas.length == 0){
          this.generic.showInformation("Nenhum registro foi encontrado.");
        }
        // this.gridLinhas = linhas;
      },
      (error) => {
        this.generic.showError('Erro ao carregar linhas:', error);
      }
    ).add(() =>{
      this.buttonConsultar.isRequesting = false;
    });
    this.efetuandoAltercao = false;
  }

  vetItem: any[] | any = [];


  linhaOld : Linha  =  new Linha();
  efetuandoAltercao : boolean = false;
  onClickEditar(linha : Linha){
    if(!this.efetuandoAltercao){

      this.generic.onClickButtonEditar(linha);

      this.linhaOld.dsLinha = linha.dsLinha;

      this.efetuandoAltercao = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração conclua a anterior primeiro.');
    }
  }

  async onClickCancelar(linha : Linha){
    if(linha.dsLinha != this.linhaOld.dsLinha){
      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){
        this.generic.onClickButtonCancelar(linha);

        linha.dsLinha = this.linhaOld.dsLinha;

        this.efetuandoAltercao = false;
      }
    }else{
      this.generic.onClickButtonCancelar(linha);

      this.efetuandoAltercao = false;
    }
  }

  onClickConfirmar(linha : Linha){
    if(linha.dsLinha != this.linhaOld.dsLinha){
      this.linhaService.updateLinha(linha).subscribe(
        (response) => {
          this.generic.showSuccess("Linha ("+linha.dsLinha.trim()+") atualizada com sucesso!");

          this.generic.onClickButtonConfirmar(linha);
          this.efetuandoAltercao = false;
        },
        (error) => {
          this.generic.showError(error.error?.errors);
        }
      );
    }else{
      this.generic.onClickButtonConfirmar(linha);
      this.efetuandoAltercao = false;
    }
  }

  async onClickExcluir(linha : Linha, idx : number){
    if(await this.generic.showAlert('Deseja realmente remover esta linha?') == 1){
      this.linhaService.deleteLinha(linha).subscribe(
        (response) => {
          this.generic.showSuccess("Linha ("+linha.dsLinha.trim()+") excluida com sucesso!");
          this.gridLinhas.splice(idx, 1);
        },
        (error) => {
          this.generic.showError(error.error?.errors);
        }
      );
    }
  }
}
