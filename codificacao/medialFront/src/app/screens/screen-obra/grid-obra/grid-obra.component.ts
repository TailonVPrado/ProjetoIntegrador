import { ObraService } from './../../../services/obra.service';
import { Esquadria } from './../../../models/objetos/esquadria.model';
import { EsquadriaService } from './../../../services/esquadria.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { Obra } from 'src/app/models/objetos/obra.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EsquadriaObraService } from 'src/app/services/esquadriaObra.service';
import { Properties } from 'src/app/models/interface/properties.model';
import { EsquadriaObra } from 'src/app/models/objetos/esquadriaObra.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { GenericService } from 'src/app/services/generic.service';
import * as _ from 'lodash';

@Component({
  selector: 'grid-obra',
  templateUrl: './grid-obra.component.html',
  styleUrls: ['./grid-obra.component.scss']
})
export class GridObraComponent implements OnInit {

  constructor(public tipoBotao : TipoBotao,
              private esquadriaService : EsquadriaService,
              private modalService: BsModalService,
              private esquadriaObraService : EsquadriaObraService,
              private generic : GenericService,
              private obraService : ObraService) { }

  ngOnInit(): void {
    this.carregaCores();
  }

  @Input() gridObra: Obra[] = [];
  @Input() efetuandoAltercaoObra : boolean = false;
  obraOld : Obra = new Obra();

  cores : string[] = [];
  carregaCores(){
    this.esquadriaObraService.getCores().subscribe(
      (response) => {
        this.cores = response;
      }
    )
  }


  async onClickExcluirObra(obra : Obra, idx : number){
    if(await this.generic.showAlert('Deseja realmente remover esta obra?') == 1){
      this.obraService.deleteObra(obra).subscribe(
        (response) => {
          this.generic.showSuccess("Obra ("+obra.dsObra.trim()+") excluido com sucesso!");
          this.gridObra.splice(idx, 1);
        },
        (error) => {
          if(error.error.errors)
            this.generic.showError(error.error.errors, "Erro ao excluir Obra");
        }
      );
    }
  }

  onClickEditarObra(obra : Obra){
    if(!this.efetuandoAltercaoObra){

      this.generic.onClickButtonEditar(obra, false);
      obra.properties.get('dsObra')!.ativo = true;

      this.obraOld = _.cloneDeep(obra);

      this.efetuandoAltercaoObra = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração, conclua a anterior primeiro.');
    }
  }

  async onClickCancelarObra(idx : number){
    if(!_.isEqual(this.gridObra[idx], this.obraOld)){
      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){

        this.gridObra[idx] = _.cloneDeep(this.obraOld);

        this.gridObra[idx].properties.get('dsObra')!.ativo = false;
        this.generic.onClickButtonCancelar(this.gridObra[idx], false);
        this.efetuandoAltercaoObra = false;
      }
    }else{
      this.generic.onClickButtonCancelar(this.gridObra[idx], false);
      this.gridObra[idx].properties.get('dsObra')!.ativo = false;
      this.efetuandoAltercaoObra = false;
    }
  }

  onClickConfirmarObra(obra : Obra){
    if(!_.isEqual(obra, this.obraOld)){
      this.obraService.updateObra(obra).subscribe(
        (response) => {
          this.generic.showSuccess("Obra ("+obra.dsObra.trim()+") atualizada com sucesso!");

          this.generic.onClickButtonConfirmar(obra, false);
          obra.properties.get('dsObra')!.ativo = false;

          this.efetuandoAltercaoObra = false;
        },
        (error) => {
          if(error.error.errors)
            this.generic.showError(error.error.errors, "Erro ao atualizar Obra");
        }
      );
    }else{
      this.generic.onClickButtonConfirmar(obra, false);
      obra.properties.get('dsObra')!.ativo = false;

      this.efetuandoAltercaoObra = false;
    }
  }

  //DAQUI PARA BAIXO É A LOGICA DE ALTERAÇÃO NO GRID DE VINCULO DE ESQUADRIAS COM OBRAS
  //DAQUI PARA BAIXO É A LOGICA DE ALTERAÇÃO NO GRID DE VINCULO DE ESQUADRIAS COM OBRAS
  //DAQUI PARA BAIXO É A LOGICA DE ALTERAÇÃO NO GRID DE VINCULO DE ESQUADRIAS COM OBRAS

  esquadriaObra : EsquadriaObra = new EsquadriaObra();
  esquadriasDisponiveis : Map<number, string> = new Map<number, string>();

  inputDsEsquadria = new Properties({label: 'Esquadria', placeholder: 'Insira a Esquadria'});
  inputDsCor = new Properties({label: 'Cor'})
  inputCdEsquadriaObra = new Properties({label: 'Código', placeholder: 'Código'});
  inputTmAltura = new Properties({label: 'Altura', placeholder: 'Altura'});
  inputTmLargura = new Properties({label: 'Largura', placeholder: 'Largura'});
  gridEsquadriaObra : EsquadriaObra[] = [];
  buttonCadastrarEsquadriaObra: ButtonModel = new ButtonModel({  });

  //checkbox para nao limpar campos da tela
  chkLimparCamposAposCadastro : boolean = true;
  chkLimparCamposAposCadastroProperties = new Properties({label: 'Limpar campos ao vincular nova esquadria'});

  esquadriaObraOld : EsquadriaObra = new EsquadriaObra();
  efetuandoAltercaoEsquadriaObra : boolean = false;

  modalRef?: BsModalRef;
  titleModal : string = '';
  configModal = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'full-size-modal'
  };

  openModalEsquadriaObra(template: TemplateRef<any>, obra: Obra){
    if(!obra.properties.get('dsObra')?.ativo){
      this.titleModal = obra.dsObra;

      this.carregaEsquadriaObra(obra);

      let esquadriaFilter = new Esquadria();
      this.esquadriaObra.obra = obra;

      this.esquadriasDisponiveis = new Map<number, string>();
      this.esquadriaService.getEsquadrias(esquadriaFilter).subscribe(
        (response) => {
          response.forEach((esquadria) =>{
            this.esquadriasDisponiveis.set(esquadria.idEsquadria, esquadria.dsEsquadria);
          })
        }
      );
      this.esquadriaObra.esquadria = new Esquadria();
      this.modalRef = this.modalService.show(template, this.configModal);
    }
  }

  carregaEsquadriaObra(obra : Obra){
    let esquadriaObraFilter = new EsquadriaObra();
    esquadriaObraFilter.obra = obra;

    let gridEsquadriaObraAux : EsquadriaObra[] = [];
    this.esquadriaObraService.getEsquadriasObra(esquadriaObraFilter).subscribe(
      (esquadriaObra)=>{
        esquadriaObra.forEach((esquadriaObra, i) => {
          gridEsquadriaObraAux[i] = esquadriaObra;
          gridEsquadriaObraAux[i].properties = new Properties({ativo : false});
          gridEsquadriaObraAux[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true],
             [this.tipoBotao.DUPLICAR, true]
          ])
        });
      }
    );
    this.gridEsquadriaObra = gridEsquadriaObraAux;
    this.efetuandoAltercaoEsquadriaObra = false;
  }

  esquadriaSelecionada(id: any, esquadriaObra : EsquadriaObra){
    if(id == null){
      esquadriaObra.esquadria = new Esquadria();
    }else{
      this.esquadriaService.getEsquadriaById(id).subscribe(
        (esquadria) => { esquadriaObra.esquadria = esquadria; }
      )
    }
  }

  async onClickCadastrarEsquadriaObra(){
    this.buttonCadastrarEsquadriaObra.isRequesting = true;
    this.esquadriaObraService.createEsquadriaObra(this.esquadriaObra).subscribe(
      async (response) => {
        this.generic.showSuccess("Esquadria ("+this.esquadriaObra.esquadria.dsEsquadria+") vinculada a obra ("+ this.esquadriaObra.obra.dsObra +") com sucesso!");

        //se mudou a versao reconsulta a tela
        if(response.nrVersaobra == this.esquadriaObra.obra.nrVersao){
          this.esquadriaObra.idEsquadriaObra = response.idEsquadriaObra;

          /*adiciona a esquadria no topo do grid para manipular alguma coisa, caso o usuario queira*/
          this.gridEsquadriaObra.splice(0,0,  Object.assign({}, this.esquadriaObra) );
          this.gridEsquadriaObra[0].properties = new Properties({ativo : false});
          this.gridEsquadriaObra[0].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
            [this.tipoBotao.CONFIRMAR, false],
            [this.tipoBotao.EDITAR, true],
            [this.tipoBotao.EXCLUIR, true],
            [this.tipoBotao.DUPLICAR, true]
          ])
        }else{
          this.esquadriaObra.obra.nrVersao = response.nrVersaobra;
          this.carregaEsquadriaObra(response.obra)
        }


        this.esquadriaObraService.retornaProximoCodigoEsquadria(this.esquadriaObra.cdEsquadriaObra).subscribe(
          (response) =>{
            this.esquadriaObra.cdEsquadriaObra = response;
          }
        );
        this.esquadriaObra.idEsquadriaObra = 0;
        if(this.chkLimparCamposAposCadastro){
          /*Limpa os campos so se a checkbox de limpar campos estiver marcada*/
          this.esquadriaObra.esquadria = new Esquadria();
          this.esquadriaObra.tmAltura = 0;
          this.esquadriaObra.tmLargura = 0;

          /*seta o foco para o campo de esquadria para facilitar o cadastro da proxima*/
          const elementRef = document.getElementById('esquadriaObra-esquadria')?.querySelector('input');
          elementRef?.focus();
        }

      },
      (error) => {
        if(error.error.errors)
          this.generic.showError(error.error.errors, "Erro ao realizar vínculo");
      }
    ).add(() =>{
      this.buttonCadastrarEsquadriaObra.isRequesting = false;
    });
  }


  async onClickExcluirEsquadriaObra(esquadriaObra : EsquadriaObra, idx : number){
    if(await this.generic.showAlert('Deseja realmente desvincular esta esquadria?') == 1){
      this.esquadriaObraService.desvinculaEsquadria(esquadriaObra).subscribe(
        (response) => {
          this.esquadriaObra.obra.nrVersao = response.nrVersaobra;
          this.generic.showSuccess("Esquadria ("+esquadriaObra.esquadria.dsEsquadria.trim()+") desvinculada com sucesso!");

          if(response.nrVersaobra == esquadriaObra.obra.nrVersao){
            this.gridEsquadriaObra.splice(idx, 1);
          }else{
            this.carregaEsquadriaObra(response.obra);
          }
        },
        (error) => {
          if(error.error.errors)
            this.generic.showError(error.error.errors);
        }
      );
    }
  }

  onClickEditarEsquadriaObra(esquadriaObra : EsquadriaObra){
    if(!this.efetuandoAltercaoEsquadriaObra){

      this.generic.onClickButtonEditar(esquadriaObra);

      this.esquadriaObraOld = _.cloneDeep(esquadriaObra);

      this.efetuandoAltercaoEsquadriaObra = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração, conclua a anterior primeiro.');
    }
  }

  async onClickCancelarEsquadriaObra(idx : number){
    if(!_.isEqual(this.gridEsquadriaObra[idx], this.esquadriaObraOld)){

      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){//1 = SIM

        this.gridEsquadriaObra[idx] = _.cloneDeep(this.esquadriaObraOld);

        this.generic.onClickButtonCancelar(this.gridEsquadriaObra[idx]);
        this.efetuandoAltercaoEsquadriaObra = false;

      }
    }else{
      this.generic.onClickButtonCancelar(this.gridEsquadriaObra[idx]);

      this.efetuandoAltercaoEsquadriaObra = false;
    }
  }

  onClickConfirmarEsquadriaObra(esquadriaObra : EsquadriaObra){

    if(!_.isEqual(esquadriaObra, this.esquadriaObraOld)){

    this.esquadriaObraService.updateEsquadriaObra(esquadriaObra).subscribe(
      (response) => {

        this.generic.showSuccess("Vinculo da esquadria ("+ esquadriaObra.esquadria.dsEsquadria.trim()+") atualizado com sucesso!");

        this.efetuandoAltercaoEsquadriaObra = false;

        /*se a versao for diferente reconsulta a tela*/
        if(response.nrVersaobra != esquadriaObra.obra.nrVersao){
          this.esquadriaObra.obra.nrVersao = response.nrVersaobra;
          this.carregaEsquadriaObra(response.obra);
        }
        this.generic.onClickButtonConfirmar(esquadriaObra);

      },
      (error) => {
        if(error.error.errors)
          this.generic.showError(error.error.errors, "Erro ao atualizar vínculo");
      }
    );
  }else{
    this.generic.onClickButtonConfirmar(esquadriaObra);
    this.efetuandoAltercaoEsquadriaObra = false;
  }
  }

  onClickDuplicarEsquadriaObra(esquadriaObra : EsquadriaObra, idx : number){

    this.esquadriaObraService.duplicarEsquadriaObra(esquadriaObra).subscribe(
      async (response) => {
        this.generic.showSuccess("Esquadria ("+response.esquadria.dsEsquadria+") duplicada com sucesso!");

        //se mudou a versao reconsulta a tela
        if(response.nrVersaobra == esquadriaObra.obra.nrVersao){

          /*adiciona a esquadria no topo do grid para manipular alguma coisa, caso o usuario queira*/
          this.gridEsquadriaObra.splice(0,0,  Object.assign({}, response) );
          this.gridEsquadriaObra[0].properties = new Properties({ativo : false});
          this.gridEsquadriaObra[0].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
            [this.tipoBotao.CONFIRMAR, false],
            [this.tipoBotao.EDITAR, true],
            [this.tipoBotao.EXCLUIR, true],
            [this.tipoBotao.DUPLICAR, true]
          ])
        }else{
          this.carregaEsquadriaObra(response.obra)
        }
      },
      (error) => {
        if(error.error.errors)
          this.generic.showError(error.error.errors);
      }
    );
  }
}
