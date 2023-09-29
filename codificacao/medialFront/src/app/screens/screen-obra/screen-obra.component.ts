import { ObraService } from './../../services/obra.service';
import { Component, OnInit } from '@angular/core';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { Obra } from 'src/app/models/objetos/obra.model';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'screen-obra',
  templateUrl: './screen-obra.component.html',
  styleUrls: ['./screen-obra.component.scss']
})
export class ScreenObraComponent implements OnInit {

  constructor(public tipoBotao : TipoBotao,
              public obraService : ObraService,
              private generic : GenericService) { }

  ngOnInit(): void {
  }


  obra : Obra = new Obra();
  inputDsObra = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDtLancamento = new InputModel({label: 'Data Lcto', placeholder: 'Insira a data'});
  buttonCadastrarObra: ButtonModel = new ButtonModel({  });
  buttonConsultarObra: ButtonModel = new ButtonModel({ label: 'Consultar' });

  gridObras: Obra[] = [];

  onClickCadastrarObra(){
    this.obraService.createObra(this.obra).subscribe(
      (response) => {
        this.generic.showSuccess("Obra ("+this.obra.dsObra.trim()+") cadastrada com sucesso!");

        /*adiciona a esquadria no topo do grid para manipular alguma coisa, caso o usuario queira*/
        this.gridObras.splice(0,0,this.obra);
        this.gridObras[0].properties = new Properties({ativo : false});
        this.gridObras[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
           [this.tipoBotao.CONFIRMAR, false],
           [this.tipoBotao.EDITAR, true],
           [this.tipoBotao.EXCLUIR, true]
        ])

        this.obra = new Obra();
      },
      (error) => {
        this.generic.showError(error.error.errors[0]);
      }
    );
  }

  onClickConsultarObra(){
  }

  onClickExcluirObra(obra : Obra, idx : number){
  }

  onClickCancelarObra(obra : Obra){
  }

  onClickEditarObra(obra : Obra){
  }

  onClickConfirmarObra(obra : Obra){
  }

}
