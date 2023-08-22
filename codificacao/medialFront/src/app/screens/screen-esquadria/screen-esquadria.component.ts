import { EsquadriaService } from './../../services/esquadria.service';
import { Perfil } from './../../models/objetos/perfil.model';
import { LinhaService } from './../../services/linha.service';
import { tipoBotao } from './../../models/enum/tipoBotao.model';
import { Component, OnInit } from '@angular/core';
import { Esquadria } from 'src/app/models/objetos/esquadria.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { GenericService } from 'src/app/services/generic.service';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'screen-esquadria',
  templateUrl: './screen-esquadria.component.html',
  styleUrls: ['./screen-esquadria.component.scss']
})
export class ScreenEsquadriaComponent implements OnInit {

  constructor(public tipoBotao : tipoBotao,
              private linhaService: LinhaService,
              private esquadriaService : EsquadriaService,
              private generic : GenericService) { }

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

  onClickCadastrar(){
    this.esquadriaService.createEsquadria(this.esquadria).subscribe(
      (response) => {
        this.generic.showSuccess("Esquadria ("+this.esquadria.dsEsquadria.trim()+") cadastrado com sucesso!");

        /*adiciona a esquadria no topo do grid para manipular alguma coisa, caso o usuario queira*/
        this.gridEsquadria.splice(0,0,this.esquadria);
        this.gridEsquadria[0].properties = new Properties({ativo : false});
        this.gridEsquadria[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
           [this.tipoBotao.CONFIRMAR, false],
           [this.tipoBotao.EDITAR, true],
           [this.tipoBotao.EXCLUIR, true]
        ])

        this.esquadria = new Esquadria;
      },
      (error) => {
        this.generic.showError(error.error.errors[0]);
      }
    );
  }

  onClickConsultar(){
    this.carregaEsquadrias();
  }

  carregaEsquadrias() {
    //todo alterar para passar a empresa tbm
    this.esquadriaService.getEsquadrias(this.esquadria).subscribe(
      (perfis) => {
        this.gridEsquadria = [];
        perfis.forEach((perfil, i) =>{
          this.gridEsquadria[i] = perfil;
          this.gridEsquadria[i].properties = new Properties({ativo : false});
          this.gridEsquadria[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true]
          ])
        });
        if(this.gridEsquadria.length == 0){
          this.generic.showInformation("Nenhum registro foi encontrado.");
        }
      },
      (error) => {
        this.generic.showError('Erro ao carregar perfis:', error.error.error[0]);
      }
    )
    this.efetuandoAltercao = false;
  }

  efetuandoAltercao : boolean = false;
  async onClickExcluir(esquadria : Esquadria, idx : number){
    if(await this.generic.showAlert('Deseja realmente remover este perfil?') == 1){
      this.esquadriaService.deleteEsquadria(esquadria.idEsquadria).subscribe(
        (response) => {
          this.generic.showSuccess("Perfil ("+esquadria.dsEsquadria.trim()+") excluido com sucesso!");
          this.gridEsquadria.splice(idx, 1);
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
        }
      );
    }
  }
}
