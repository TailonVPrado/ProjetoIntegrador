import { Component, OnInit } from '@angular/core';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { InputModel } from 'src/app/models/interface/input.model';
import { Obra } from 'src/app/models/objetos/obra.model';

@Component({
  selector: 'screen-obra',
  templateUrl: './screen-obra.component.html',
  styleUrls: ['./screen-obra.component.scss']
})
export class ScreenObraComponent implements OnInit {

  constructor(public tipoBotao : TipoBotao) { }

  ngOnInit(): void {
  }


  obra : Obra = new Obra();
  inputDsObra = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDtLancamento = new InputModel({label: 'Data Lcto', placeholder: 'Insira a data'});
  buttonCadastrarObra: ButtonModel = new ButtonModel({  });
  buttonConsultarObra: ButtonModel = new ButtonModel({ label: 'Consultar' });

  gridObras: Obra[] = [];

  onClickConsultarObra(){
  }

  onClickCadastrarObra(){
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
