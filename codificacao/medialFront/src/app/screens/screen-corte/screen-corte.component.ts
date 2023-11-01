import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { EsquadriaObraAgrupadaDto } from 'src/app/models/objetos/dto/esquadriaObraAgrupadaDto.model';
import { Obra } from 'src/app/models/objetos/obra.model';
import { EsquadriaObraService } from 'src/app/services/esquadriaObra.service';
import { GenericService } from 'src/app/services/generic.service';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'screen-corte',
  templateUrl: './screen-corte.component.html',
  styleUrls: ['./screen-corte.component.scss']
})
export class ScreenCorteComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(private obraService: ObraService,
              private generic: GenericService,
              public tipoBotao: TipoBotao,
              private modalService: BsModalService,
              private esquadriaObraService : EsquadriaObraService,)
  {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.datasFiltro[0].setDate(this.datasFiltro[0].getDate() - 1000);//todo voltar para -15
  }

  obra: Obra = new Obra();
  gridObra: Obra[] = [];
  chkExibirObrasImpressas : boolean = false;

  //propiedades
  inputDsObra = new InputModel({ label: 'Descrição', placeholder: 'Insira a descrição' });
  inputDtLancamento = new InputModel({ label: 'Data Lcto', placeholder: 'Insira a data' });
  buttonConsultarObra: ButtonModel = new ButtonModel({ label: 'Consultar' });
  datasFiltro : Date[] = [new Date(), new Date()];
  chkExibirObrasImpressasProperties = new InputModel({label: 'Exibir já impressos'});

  onClickConsultarObra() {
    //todo alterar para passar a empresa tbm
    this.buttonConsultarObra.isRequesting = true;
    this.obraService.getObras(this.obra, this.datasFiltro, 0, this.chkExibirObrasImpressas).subscribe(
      (obras) => {
        this.gridObra = [];
        obras.forEach((obra, i) =>{
          obra.dtLancamento = this.generic.formataData(obra.dtLancamento);
          this.gridObra[i] = obra;

          this.gridObra[i].properties = new Map<string, Properties>();
          for(let name in this.gridObra[i]){
            this.gridObra[i].properties.set(name, new Properties({ativo : false}));
          }
          // this.gridObra[i].properties = new Properties({ativo : false});
          this.gridObra[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.RECALCULAR, true],
             [this.tipoBotao.IMPRIMIR, true]
          ])
        });
        if(this.gridObra.length == 0){
          this.generic.showInformation("Nenhum registro foi encontrado.");
        }
      },
      (error) => {
        this.generic.showError('Erro ao carregar obras:', error.error.error[0]);
      }
    ).add(() =>{
      this.buttonConsultarObra.isRequesting = false;
    });
  }

  onClickRecalcularDescontos(obra : Obra){
  }

  onClickImprimir(obra : Obra){
  }

  /**/
  gridEsquadriaObra : EsquadriaObraAgrupadaDto[] = [];

  modalRefEsquadriaObra?: BsModalRef;
  titleModalEsquadriaObra : string = '';
  configModal = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'full-size-modal'
  };
  openModalEsquadriaObra(template: TemplateRef<any>, obra: Obra){
    if(!obra.properties.get('dsObra')?.ativo){
      this.titleModalEsquadriaObra = obra.dsObra;

      this.carregaEsquadriaObra(obra);

      this.modalRefEsquadriaObra = this.modalService.show(template, this.configModal);
    }
  }

  carregaEsquadriaObra(obra : Obra){
    this.gridEsquadriaObra = [];
    this.esquadriaObraService.getEsquadriasObraAgrupadas(obra.idObra).subscribe(
      (esquadriaObraAgrupadaDto)=>{
        esquadriaObraAgrupadaDto.forEach((esquadriaObraAgrupadaDto, i) => {
          this.gridEsquadriaObra[i] = esquadriaObraAgrupadaDto;
          this.gridEsquadriaObra[i].properties = new Properties({ativo : false});
        });
      }
    );
  }
}
