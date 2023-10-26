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
import { InputModel } from 'src/app/models/interface/input.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { GenericService } from 'src/app/services/generic.service';

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
          this.generic.showError(error.error.errors[0]);
        }
      );
    }
  }

  onClickEditarObra(obra : Obra){
    if(!this.efetuandoAltercaoObra){

      this.generic.onClickButtonEditar(obra, false);
      obra.properties.get('dsObra')!.ativo = true;

      this.obraOld.dsObra = obra.dsObra;

      this.efetuandoAltercaoObra = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração conclua a anterior primeiro.');
    }
  }

  async onClickCancelarObra(obra : Obra){
    if(obra.dsObra != this.obraOld.dsObra){
      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){
        this.generic.onClickButtonCancelar(obra, false);
        obra.properties.get('dsObra')!.ativo = false;

        obra.dsObra = this.obraOld.dsObra;

        this.efetuandoAltercaoObra = false;
      }
    }else{
      this.generic.onClickButtonCancelar(obra, false);
      obra.properties.get('dsObra')!.ativo = false;
      this.efetuandoAltercaoObra = false;
    }
  }

  onClickConfirmarObra(obra : Obra){
    if(obra.dsObra != this.obraOld.dsObra){
      this.obraService.updateObra(obra).subscribe(
        (response) => {
          this.generic.showSuccess("Obra ("+obra.dsObra.trim()+") atualizada com sucesso!");

          this.generic.onClickButtonConfirmar(obra, false);
          obra.properties.get('dsObra')!.ativo = false;

          this.efetuandoAltercaoObra = false;
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
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

  inputDsEsquadria = new InputModel({label: 'Esquadria', placeholder: 'Insira a Esquadria'});
  inputDsCor = new InputModel({label: 'Cor'})
  inputCdEsquadriaObra = new InputModel({label: 'Código', placeholder: 'Código'});
  inputTmAltura = new InputModel({label: 'Altura', placeholder: 'Altura'});
  inputTmLargura = new InputModel({label: 'Largura', placeholder: 'Largura'});
  gridEsquadriaObra : EsquadriaObra[] = [];
  buttonCadastrarEsquadriaObra: ButtonModel = new ButtonModel({  });

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

    this.gridEsquadriaObra = [];
    this.esquadriaObraService.getEsquadriasObra(esquadriaObraFilter).subscribe(
      (esquadriaObra)=>{
        esquadriaObra.forEach((esquadriaObra, i) => {
          this.gridEsquadriaObra[i] = esquadriaObra;
          this.gridEsquadriaObra[i].properties = new Properties({ativo : false});
          this.gridEsquadriaObra[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true],
             [this.tipoBotao.DUPLICAR, true]
          ])
        });
        //todo ver como o generic daz para mudar o duplicar
      }
    );
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

  onClickCadastrarEsquadriaObra(){
    this.buttonCadastrarEsquadriaObra.isRequesting = true;
    this.esquadriaObraService.createEsquadriaObra(this.esquadriaObra).subscribe(
      (response) => {
        this.generic.showSuccess("Esquadria ("+this.esquadriaObra.esquadria.dsEsquadria+") vinculada a obra ("+ this.esquadriaObra.obra.dsObra +") com sucesso!");

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
        //todo ver como o generic daz para mudar o duplicar
        this.esquadriaObra.esquadria = new Esquadria();
        this.esquadriaObra.idEsquadriaObra = 0;

      },
      (error) => {
        this.generic.showError(error.error.errors[0]);
      }
    ).add(() =>{
      this.buttonCadastrarEsquadriaObra.isRequesting = false;
    });
  }

  async onClickExcluirEsquadriaObra(esquadriaObra : EsquadriaObra, idx : number){
    if(await this.generic.showAlert('Deseja realmente desvincular esta esquadria?') == 1){
      this.esquadriaObraService.desvinculaEsquadria(esquadriaObra).subscribe(
        (response) => {
          this.generic.showSuccess("Esquadria ("+esquadriaObra.esquadria.dsEsquadria.trim()+") desvinculada com sucesso!");
          this.gridEsquadriaObra.splice(idx, 1);
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
        }
      );
    }
  }

  onClickEditarEsquadriaObra(esquadriaObra : EsquadriaObra){
    if(!this.efetuandoAltercaoEsquadriaObra){

      this.generic.onClickButtonEditar(esquadriaObra);

      this.esquadriaObraOld.esquadria.idEsquadria = esquadriaObra.esquadria.idEsquadria;
      this.esquadriaObraOld.dsCor = esquadriaObra.dsCor;
      this.esquadriaObraOld.cdEsquadriaObra = esquadriaObra.cdEsquadriaObra;
      this.esquadriaObraOld.tmAltura = esquadriaObra.tmAltura;
      this.esquadriaObraOld.tmLargura = esquadriaObra.tmLargura;

      this.efetuandoAltercaoEsquadriaObra = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração conclua a anterior primeiro.');
    }
  }

  async onClickCancelarEsquadriaObra(esquadriaObra : EsquadriaObra){
    if(this.esquadriaObraOld.esquadria.idEsquadria != esquadriaObra.esquadria.idEsquadria ||
       this.esquadriaObraOld.dsCor != esquadriaObra.dsCor ||
       this.esquadriaObraOld.cdEsquadriaObra != esquadriaObra.cdEsquadriaObra ||
       this.esquadriaObraOld.tmAltura != esquadriaObra.tmAltura ||
       this.esquadriaObraOld.tmLargura != esquadriaObra.tmLargura ){

      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){//1 = SIM

        this.generic.onClickButtonCancelar(esquadriaObra);

        this.efetuandoAltercaoEsquadriaObra = false;

        esquadriaObra.esquadria.idEsquadria =this.esquadriaObraOld.esquadria.idEsquadria;
        esquadriaObra.dsCor = this.esquadriaObraOld.dsCor;
        esquadriaObra.cdEsquadriaObra = this.esquadriaObraOld.cdEsquadriaObra;
        esquadriaObra.tmAltura = this.esquadriaObraOld.tmAltura;
        esquadriaObra.tmLargura = this.esquadriaObraOld.tmLargura;
      }
    }else{
      this.generic.onClickButtonCancelar(esquadriaObra);

      this.efetuandoAltercaoEsquadriaObra = false;
    }
  }

  onClickConfirmarEsquadriaObra(esquadriaObra : EsquadriaObra){
  }

  onClickDuplicarEsquadriaObra(esquadriaObra : EsquadriaObra, idx : number){
  }
}
