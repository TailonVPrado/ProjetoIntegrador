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

  onClickCancelarObra(obra : Obra){
  }

  onClickEditarObra(obra : Obra){
  }

  onClickConfirmarObra(obra : Obra){
  }


  esquadriaObra : EsquadriaObra = new EsquadriaObra();
  esquadriasDisponiveis : Map<number, string> = new Map<number, string>();

  inputDsEsquadria = new InputModel({label: 'Esquadria', placeholder: 'Insira a Esquadria'});
  inputCdEsquadriaObra = new InputModel({label: 'Código', placeholder: 'Insira o Código'});
  inputTmLargura = new InputModel({label: 'Altura', placeholder: 'Insira a Altura'});
  inputTmAltura = new InputModel({label: 'Código', placeholder: 'Insira a Largura'});
  gridEsquadriaObra : EsquadriaObra[] = [];
  buttonCadastrarEsquadriaObra: ButtonModel = new ButtonModel({  });


  efetuandoAltercaoEsquadriaObra : boolean = false;

  modalRef?: BsModalRef;
  titleModal : string = '';
  configModal = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'full-size-modal'
  };


  //DAQUI PARA BAIXO É A LOGICA DE ALTERAÇÃO NO GRID DE VINCULO DE ESQUADRIAS COM OBRAS
  //DAQUI PARA BAIXO É A LOGICA DE ALTERAÇÃO NO GRID DE VINCULO DE ESQUADRIAS COM OBRAS
  //DAQUI PARA BAIXO É A LOGICA DE ALTERAÇÃO NO GRID DE VINCULO DE ESQUADRIAS COM OBRAS

  openModalEsquadriaObra(template: TemplateRef<any>, obra: Obra){
    if(!obra.properties.ativo){
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

    this.esquadriaObraService.getEsquadriasObra(esquadriaObraFilter).subscribe(
      (esquadriaObra)=>{
        this.gridEsquadriaObra = [];
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
    )
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
    );
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

  onClickCancelarEsquadriaObra(esquadriaObra : EsquadriaObra){
  }

  onClickEditarEsquadriaObra(esquadriaObra : EsquadriaObra){
  }

  onClickConfirmarEsquadriaObra(esquadriaObra : EsquadriaObra){
  }

  onClickDuplicarEsquadriaObra(esquadriaObra : EsquadriaObra, idx : number){
  }
}
