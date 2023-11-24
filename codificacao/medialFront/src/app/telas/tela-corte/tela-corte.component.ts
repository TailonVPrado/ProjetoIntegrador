import { PerfilObraService } from './../../services/perfilObra.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { PerfilObraAgrupadoDto } from 'src/app/models/objetos/dto/PerfilObraAgrupadoDto.model';
import { EsquadriaObraAgrupadaDto } from 'src/app/models/objetos/dto/esquadriaObraAgrupadaDto.model';
import { Obra } from 'src/app/models/objetos/obra.model';
import { EsquadriaObraService } from 'src/app/services/esquadriaObra.service';
import { GenericService } from 'src/app/services/generic.service';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'tela-corte',
  templateUrl: './tela-corte.component.html',
  styleUrls: ['./tela-corte.component.scss']
})
export class TelaCorteComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(private obraService: ObraService,
              private generic: GenericService,
              public tipoBotao: TipoBotao,
              private modalService: BsModalService,
              private esquadriaObraService : EsquadriaObraService,
              private perfilObraService : PerfilObraService)
  {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.datasFiltro[0].setDate(this.datasFiltro[0].getDate() - 15);
  }

  obra: Obra = new Obra();
  gridObra: Obra[] = [];
  chkExibirObrasImpressas : boolean = false;

  //propiedades
  inputDsObra = new Properties({ label: 'Descrição', placeholder: 'Insira a descrição' });
  inputDtLancamento = new Properties({ label: 'Data Lcto', placeholder: 'Insira a data' });
  buttonConsultarObra: ButtonModel = new ButtonModel({ label: 'Consultar' });
  datasFiltro : Date[] = [new Date(), new Date()];
  chkExibirObrasImpressasProperties = new Properties({label: 'Exibir já impressos'});

  onClickConsultarObra() {
    this.buttonConsultarObra.isRequesting = true;
    this.obraService.getObras(this.obra, this.datasFiltro, 0, this.chkExibirObrasImpressas).subscribe(
      (obras) => {
        this.gridObra = [];
        obras.forEach((obra, i) =>{
          obra.dtLancamento = this.generic.formataData(obra.dtLancamento);
          this.gridObra[i] = obra;

          this.gridObra[i].properties = new Map<string, Properties>();
          for(let name in this.gridObra[i]){
            this.gridObra[i].properties.set(name, new Properties({ativo : false, isRequesting : false}));
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
        if(error.error.errors)
          this.generic.showError(error.error.errors, 'Erro ao carregar Obras');
      }
    ).add(() =>{
      this.buttonConsultarObra.isRequesting = false;
    });
  }

  onClickRecalcularDescontos(obra : Obra){
    this.obraService.recalcularDescontos(obra).subscribe(
      (response) => {
        this.generic.showSuccess("Recálculo de desconstos da obra ("+obra.dsObra+") iniciado!");
      },
      (error) => {
        if(error.error.errors)
          this.generic.showError(error.error.errors, "Erro ao iniciar recálculos");
      }
    );
  }

  onClickImprimir(obra : Obra){
    let propertiesObra = obra.properties.get('dsObra');


    if(propertiesObra?.isRequesting){
      return; // se estiver executando esse relatorio retorna sem fazer mais nada;
    }

    this.generic.showInformation("Gerando relatório");

    if (propertiesObra) {
      propertiesObra.isRequesting = true;
    }


    this.obraService.gerarRelatorio(obra).subscribe(
      (blob) => {

        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');

        window.URL.revokeObjectURL(url);

        this.generic.showSuccess("Relatório gerado com sucesso");

        obra.stImpresso = true;
      },
      (error) => {
        console.log(error);
        if(error.error instanceof Blob){
          error.error.text().then((errorText : any) => {
            try {
                const errorObject = JSON.parse(errorText.replace(/\\/g, ''));
                this.generic.showError(errorObject.errors.join(), "Erro ao realizar relatório de cortes");
            } catch (jsonParseError) {
                this.generic.showError("Erro ao exportar relatório de cortes");
            }
          });
        }else{
          console.error('Erro inesperado ao exportar relatório de cortes', error)
          this.generic.showError("Ocorreu um erro incesperado ao exportar o relatório de cortes. Entre em contato com os administradores do sistema.");
        }

      }
    ).add(() =>{
      if (propertiesObra) {
        propertiesObra.isRequesting = false;
      }
    });
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

  //APARTIR DESTE TRECHO COMECA A LOGICA PARA CARREGAMENTO DA MODAL DOS PERFIS DA ESQUADRIA (TERCEIRA MODAL QUE A TELA DE CORTES ABRE)

  gridPerfilObra : PerfilObraAgrupadoDto[] = [];

  modalRefPerfilObra?: BsModalRef;
  titleModalPerfilObra : string = '';
  configModalPerfilObra = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'full-width-modal'
  };
  openModalPerfilObra(template: TemplateRef<any>, eo: EsquadriaObraAgrupadaDto){
    if(!eo.properties.ativo){
      this.titleModalPerfilObra = eo.dsEsquadria + ' (' + eo.dsLinha + ')';

      this.carregaPerfilObra(eo);

      this.modalRefPerfilObra = this.modalService.show(template, this.configModalPerfilObra);
    }
  }

  carregaPerfilObra(eo : EsquadriaObraAgrupadaDto){
    this.gridPerfilObra = [];
    this.perfilObraService.getPerfilObraAgrupado(eo.idEsquadria, eo.idObra, eo.dsCor, eo.tmLargura, eo.tmAltura).subscribe(
      (response)=>{
        response.forEach((perfilObraAgrupadoDto, i) => {
          this.gridPerfilObra[i] = perfilObraAgrupadoDto;
          this.gridPerfilObra[i].properties = new Properties({ativo : false});
        });
      },
      (error) => {
        if(error.error.errors)
          this.generic.showError(error.error.errors, "Erro ao consultar Perfis");
      }
    );
  }

}
