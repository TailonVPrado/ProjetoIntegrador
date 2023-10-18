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

@Component({
  selector: 'grid-obra',
  templateUrl: './grid-obra.component.html',
  styleUrls: ['./grid-obra.component.scss']
})
export class GridObraComponent implements OnInit {

  constructor(public tipoBotao : TipoBotao,
              private esquadriaService : EsquadriaService,
              private modalService: BsModalService,
              private esquadriaObraService : EsquadriaObraService) { }

  ngOnInit(): void {
  }

  @Input() gridObra: Obra[] = [];
  @Input() efetuandoAltercaoObra : boolean = false;


  onClickExcluirObra(obra : Obra, idx : number){
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
    // todo
    // this.perfilEsquadriaService.createPerfilEsquadria(this.perfilEsquadria).subscribe(
    //   (response) => {
    //     this.generic.showSuccess("Perfil ("+this.perfilEsquadria.perfil.dsPerfil+") vinculado a esquadria ("+ this.perfilEsquadria.esquadria.dsEsquadria +") com sucesso!");

    //     this.perfilEsquadria.idPerfilEsquadria = response.idPerfilEsquadria;
    //     this.perfilEsquadria.dsDesconto = response.dsDesconto;
    //     /*adiciona o perfil no topo do grid para manipular alguma coisa, caso o usuario queira*/
    //     this.gridPerfilEsquadria.splice(0,0,  Object.assign({}, this.perfilEsquadria) );
    //     this.gridPerfilEsquadria[0].properties = new Properties({ativo : false});
    //     this.gridPerfilEsquadria[0].visibilidadeBotoes = new Map <string, boolean>([
    //       [this.tipoBotao.CANCELAR, false],
    //        [this.tipoBotao.CONFIRMAR, false],
    //        [this.tipoBotao.EDITAR, true],
    //        [this.tipoBotao.EXCLUIR, true],
    //        [this.tipoBotao.DUPLICAR, true]
    //     ])
    //     //todo ver como o generic daz para mudar o duplicar
    //     this.perfilEsquadria.perfil = new Perfil();
    //     this.perfilEsquadria.idPerfilEsquadria = 0;
    //     this.perfilEsquadria.dsDesconto = '';
    //     this.perfilEsquadria.qtPerfil = 1;

    //   },
    //   (error) => {
    //     this.generic.showError(error.error.errors[0]);
    //   }
    // );
  }

  onClickDuplicarEsquadriaObra(esquadriaObra : EsquadriaObra, idx : number){

  }

  onClickExcluirEsquadriaObra(esquadriaObra : EsquadriaObra, idx : number){
  }

  onClickCancelarEsquadriaObra(esquadriaObra : EsquadriaObra){
  }

  onClickEditarEsquadriaObra(esquadriaObra : EsquadriaObra){
  }

  onClickConfirmarEsquadriaObra(esquadriaObra : EsquadriaObra){
  }
}
