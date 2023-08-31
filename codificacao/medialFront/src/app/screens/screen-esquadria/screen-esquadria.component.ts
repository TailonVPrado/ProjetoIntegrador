import { PerfilEsquadriaService} from './../../services/perfilEsquadria.service';
import { PerfilEsquadria } from './../../models/objetos/perfilEsquadria.model';
import { Esquadria } from './../../models/objetos/esquadria.model';
import { EsquadriaService } from './../../services/esquadria.service';
import { Perfil } from './../../models/objetos/perfil.model';
import { LinhaService } from './../../services/linha.service';
import { tipoBotao } from './../../models/enum/tipoBotao.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { InputModel } from 'src/app/models/interface/input.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { GenericService } from 'src/app/services/generic.service';
import { Properties } from 'src/app/models/interface/properties.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'screen-esquadria',
  templateUrl: './screen-esquadria.component.html',
  styleUrls: ['./screen-esquadria.component.scss']
})
export class ScreenEsquadriaComponent implements OnInit {

  constructor(public tipoBotao : tipoBotao,
              private linhaService: LinhaService,
              private esquadriaService : EsquadriaService,
              private perfilService : PerfilService,
              private perfilEsquadriaService : PerfilEsquadriaService,
              private generic : GenericService,
              private modalService: BsModalService) { }

  ngOnInit(): void {//todo ver esse null, null
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
  inputDsEsquadria = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDsLinha = new InputModel({label: 'Linha', placeholder: 'Linha'});
  buttonCadastrarEsquadria: ButtonModel = new ButtonModel({  });
  buttonConsultarEsquadria: ButtonModel = new ButtonModel({ label: 'Consultar' });

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

  onClickCadastrarEsquadria(){
    this.esquadriaService.createEsquadria(this.esquadria).subscribe(
      (response) => {
        this.generic.showSuccess("Esquadria ("+this.esquadria.dsEsquadria.trim()+") cadastrada com sucesso!");

        /*adiciona a esquadria no topo do grid para manipular alguma coisa, caso o usuario queira*/
        this.gridEsquadria.splice(0,0,this.esquadria);
        this.gridEsquadria[0].properties = new Properties({ativo : false});
        this.gridEsquadria[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
           [this.tipoBotao.CONFIRMAR, false],
           [this.tipoBotao.EDITAR, true],
           [this.tipoBotao.EXCLUIR, true]
        ])

        this.esquadria = new Esquadria();
      },
      (error) => {
        this.generic.showError(error.error.errors[0]);
      }
    );
  }

  onClickConsultarEsquadria(){
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
    this.efetuandoAltercaoEsquadria = false;
  }

  async onClickExcluirEsquadria(esquadria : Esquadria, idx : number){
    if(await this.generic.showAlert('Deseja realmente remover esta esquadria?') == 1){
      this.esquadriaService.deleteEsquadria(esquadria).subscribe(
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


  private esquadriaOld : Esquadria = new Esquadria();
  efetuandoAltercaoEsquadria : boolean = false;
  onClickEditarEsquadria(esquadria : Esquadria){
    if(!this.efetuandoAltercaoEsquadria){

      this.generic.onClickButtonEditar(esquadria);

      this.esquadriaOld.dsEsquadria = esquadria.dsEsquadria;
      this.esquadriaOld.linha.idLinha = esquadria.linha.idLinha;
      this.esquadriaOld.linha.dsLinha = esquadria.linha.dsLinha;

      this.efetuandoAltercaoEsquadria = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração conclua a anterior primeiro.');
    }
  }

  async onClickCancelarEsquadria(esquadria : Esquadria){
    if(esquadria.dsEsquadria != this.esquadriaOld.dsEsquadria || esquadria.linha.idLinha != this.esquadriaOld.linha.idLinha){
      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){//1 = SIM
        esquadria.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
        esquadria.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
        esquadria.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
        esquadria.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
        esquadria.properties.ativo = false;
        this.efetuandoAltercaoEsquadria = false;

        esquadria.dsEsquadria = this.esquadriaOld.dsEsquadria;
        esquadria.linha.idLinha = this.esquadriaOld.linha.idLinha;
        esquadria.linha.dsLinha = this.esquadriaOld.linha.dsLinha;
      }
    }else{
      esquadria.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
      esquadria.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
      esquadria.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
      esquadria.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
      esquadria.properties.ativo = false;
      this.efetuandoAltercaoEsquadria = false;
    }
  }

  onClickConfirmarEsquadria(esquadria : Esquadria){
    if(esquadria.dsEsquadria != this.esquadriaOld.dsEsquadria || this.esquadria.linha.idLinha != this.esquadriaOld.linha.idLinha){
      this.esquadriaService.updateEsquadria(esquadria).subscribe(
        (response) => {
          this.generic.showSuccess("Esquadria ("+ esquadria.dsEsquadria.trim()+") atualizada com sucesso!");
          esquadria.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
          esquadria.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
          esquadria.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
          esquadria.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
          esquadria.properties.ativo = false;
          this.efetuandoAltercaoEsquadria = false;
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
        }
      );
    }else{
      esquadria.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
      esquadria.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
      esquadria.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
      esquadria.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
      esquadria.properties.ativo = false;
      this.efetuandoAltercaoEsquadria = false;
    }
  }

  /********DAQUI PARA BAIXO COMECA A CODIFICAÇÃO REFERENTE AO VINCULO DE UM PERFIL COM UMA ESQUADRIA. tabela: PERFILESQUADRIA*/
  configModal = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'full-size-modal'
  };

  perfilDisponiveis : Map<number, string> = new Map<number, string>();
  inputDsPerfil = new InputModel({label: 'Perfil', placeholder: 'Insira o Perfil'});
  inputQtdePerfil = new InputModel({label: 'Qtde', placeholder: '0'});
  inputDsDesconto = new InputModel({label: 'Desconto', placeholder: 'Insira o Desconto'});

  perfilEsquadria : PerfilEsquadria = new PerfilEsquadria();
  buttonCadastrarPerfilEsquadria: ButtonModel = new ButtonModel({  });
  gridPerfilEsquadria : PerfilEsquadria[] = [];
  modalRef?: BsModalRef;

  efetuandoAltercaoPerfilEsquadria : boolean = false;
  private perfilEsquadriaOld : PerfilEsquadria = new PerfilEsquadria();

  openModalPerfilEsquadria(template: TemplateRef<any>, esquadria: Esquadria){
    this.carregaPerfilEsquadrias(esquadria);

    let perfilFilter = new Perfil();
    perfilFilter.linha = esquadria.linha;
    this.perfilEsquadria.esquadria = esquadria;

    this.perfilService.getPerfil(perfilFilter).subscribe(
      (response) => {
        response.forEach((perfil) =>{
          this.perfilDisponiveis.set(perfil.idPerfil, perfil.dsPerfil);
        })
      }
    );

    this.modalRef = this.modalService.show(template, this.configModal);
  }

  perfilSelecionado(id: any, perfilEsquadria : PerfilEsquadria){
    if(id == null){
      perfilEsquadria.perfil = new Perfil();
    }else{
      this.perfilService.getPerfilById(id).subscribe(
        (perfil) => { perfilEsquadria.perfil = perfil; }
      )
    }
  }

  carregaPerfilEsquadrias(esquadria: Esquadria) {
    let perfilEsquadriaFilter = new PerfilEsquadria();
    perfilEsquadriaFilter.esquadria = esquadria;

    this.perfilEsquadriaService.getPerfilEsquadrias(perfilEsquadriaFilter).subscribe(
      (perfilEsquadrias)=>{
        this.gridPerfilEsquadria = [];
        perfilEsquadrias.forEach((perfilEsquadria, i) => {
          this.gridPerfilEsquadria[i] = perfilEsquadria;
          this.gridPerfilEsquadria[i].properties = new Properties({ativo : false});
          this.gridPerfilEsquadria[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true]
          ])
        });

      }
    )
    this.efetuandoAltercaoPerfilEsquadria = false;
  }


  onClickCadastrarPerfilEsquadria(){
    this.perfilEsquadriaService.createPerfilEsquadria(this.perfilEsquadria).subscribe(
      (response) => {
        this.generic.showSuccess("Perfil ("+this.perfilEsquadria.perfil.dsPerfil+") vinculado a esquadria ("+ this.perfilEsquadria.esquadria.dsEsquadria +") com sucesso!");

        /*adiciona o perfil no topo do grid para manipular alguma coisa, caso o usuario queira*/
        this.gridPerfilEsquadria.splice(0,0,this.perfilEsquadria);
        this.gridPerfilEsquadria[0].properties = new Properties({ativo : false});
        this.gridPerfilEsquadria[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
           [this.tipoBotao.CONFIRMAR, false],
           [this.tipoBotao.EDITAR, true],
           [this.tipoBotao.EXCLUIR, true]
        ])

        this.perfilEsquadria = new PerfilEsquadria();
      },
      (error) => {
        this.generic.showError(error.error.errors[0]);
      }
    );
  }


  async onClickExcluirPerfilEsquadria(perfilEsquadria: PerfilEsquadria, idx: number){
    if(await this.generic.showAlert('Deseja realmente desvincular este perfil?') == 1){
      this.perfilEsquadriaService.desvinculaPerfil(perfilEsquadria).subscribe(
        (response) => {
          this.generic.showSuccess("Perfil ("+perfilEsquadria.perfil.dsPerfil.trim()+") desvinculado com sucesso!");
          this.gridPerfilEsquadria.splice(idx, 1);
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
        }
      );
    }
  }

  onClickEditarPerfilEsquadria(perfilEsquadria: PerfilEsquadria){
    if(!this.efetuandoAltercaoPerfilEsquadria){

      this.generic.onClickButtonEditar(perfilEsquadria);

      this.perfilEsquadriaOld.perfil.idPerfil = perfilEsquadria.perfil.idPerfil;
      this.perfilEsquadriaOld.perfil.dsPerfil = perfilEsquadria.perfil.dsPerfil;
      this.perfilEsquadriaOld.qtPerfil = perfilEsquadria.qtPerfil;
      this.perfilEsquadriaOld.dsDesconto = perfilEsquadria.dsDesconto;

      this.efetuandoAltercaoPerfilEsquadria = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração conclua a anterior primeiro.');
    }
  }

  onClickConfirmarPerfilEsquadria(perfilEsquadria: PerfilEsquadria){

  }

  onClickCancelarCancelarPerfilEsquadria(perfilEsquadria: PerfilEsquadria){

  }
}
