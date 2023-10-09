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


  constructor(public tipoBotao: TipoBotao,
    public obraService: ObraService,
    private generic: GenericService) { }

  ngOnInit(): void {
  }


  obra: Obra = new Obra();
  gridObra: Obra[] = [];

  inputDsObra = new InputModel({ label: 'Descrição', placeholder: 'Insira a descrição' });
  // inputDtLancamento = new InputModel({ label: 'Data Lcto', placeholder: 'Insira a data' });
  buttonCadastrarObra: ButtonModel = new ButtonModel({ label: 'Consultar' });

  efetuandoAltercaoObra : boolean = false;

  onClickConsultarObra() {
    //todo alterar para passar a empresa tbm
    this.obraService.getObras(this.obra).subscribe(
      (perfis) => {
        this.gridObra = [];
        perfis.forEach((obra, i) =>{
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

  onClickExcluirObra(obra: Obra, idx: number) {
  }

  onClickCancelarObra(obra: Obra) {
  }

  onClickEditarObra(obra: Obra) {
  }

  onClickConfirmarObra(obra: Obra) {
  }

}
