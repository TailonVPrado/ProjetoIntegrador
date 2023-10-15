import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { Obra } from 'src/app/models/objetos/obra.model';
import { GenericService } from 'src/app/services/generic.service';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'screen-obra-consulta',
  templateUrl: './screen-obra-consulta.component.html',
  styleUrls: ['./screen-obra-consulta.component.scss']
})
export class ScreenObraConsultaComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(public tipoBotao: TipoBotao,
    public obraService: ObraService,
    private generic: GenericService) {
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsRangeValue = [this.bsValue, this.maxDate];
    }

  ngOnInit(): void {
   this.datasFiltro[0].setDate(this.datasFiltro[0].getDate() - 15);
  }


  obra: Obra = new Obra();
  gridObra: Obra[] = [];

  inputDsObra = new InputModel({ label: 'Descrição', placeholder: 'Insira a descrição' });
  inputDtLancamento = new InputModel({ label: 'Data Lcto', placeholder: 'Insira a data' });
  buttonCadastrarObra: ButtonModel = new ButtonModel({ label: 'Consultar' });
  datasFiltro : Date[] = [new Date(), new Date()];
  efetuandoAltercaoObra : boolean = false;

  onClickConsultarObra() {
    //todo alterar para passar a empresa tbm
    this.obraService.getObras(this.obra, this.datasFiltro).subscribe(
      (obras) => {
        this.gridObra = [];
        obras.forEach((obra, i) =>{
          obra.dtLancamento = this.generic.formataData(obra.dtLancamento);
          this.gridObra[i] = obra;
          this.gridObra[i].properties = new Properties({ativo : false});
          this.gridObra[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true]
          ])
        });
        if(this.gridObra.length == 0){
          this.generic.showInformation("Nenhum registro foi encontrado.");
        }
      },
      (error) => {
        this.generic.showError('Erro ao carregar obras:', error.error.error[0]);
      }
    )
    this.efetuandoAltercaoObra = false;
  }

}
