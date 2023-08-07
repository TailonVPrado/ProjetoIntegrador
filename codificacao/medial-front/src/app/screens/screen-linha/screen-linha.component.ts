import { LinhaService } from './../../services/linha.service';
import { Component } from '@angular/core';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Linha } from 'src/app/models/objetos/linha.model';

@Component({
  selector: 'screen-linha',
  templateUrl: './screen-linha.component.html',
  styleUrls: ['./screen-linha.component.scss']
})
export class ScreenLinhaComponent {
  constructor(private linhaService: LinhaService){}

  linha : Linha = new Linha();
  // linhasGrid: Linha[] = [];
  inputDescricao  : InputModel = new InputModel({label: "Descrição",  placeholder: "insira a descrição"});
  buttonCadastrar : ButtonModel = new ButtonModel({label: '+ Adicionar Linha'});
  buttonConsultar : ButtonModel = new ButtonModel({label: 'Consultar'});

  gridLinhas : Linha[] = [];
  gridDsLinhaProperties: InputModel = new InputModel({});

  onClickSalvar(): void{
    this.linhaService.createLinha(this.linha).subscribe(
      (response) =>{
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
    this.buttonConsultar.label = 'kendrey';
    this.linhaService.getLinhas().subscribe(
      (linhas) => {
        this.gridLinhas = linhas;
      },
      (error) => {
        console.error('Erro ao carregar linhas:', error);
      }
    );
  }

  vetItem : any[] | any = [];


  consultaItemSimilar(){
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
}
