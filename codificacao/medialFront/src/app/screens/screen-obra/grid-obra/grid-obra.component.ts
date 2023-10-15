import { Component, Input, OnInit } from '@angular/core';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { Obra } from 'src/app/models/objetos/obra.model';

@Component({
  selector: 'grid-obra',
  templateUrl: './grid-obra.component.html',
  styleUrls: ['./grid-obra.component.scss']
})
export class GridObraComponent implements OnInit {

  constructor(public tipoBotao : TipoBotao) { }

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

}
