import { Component, OnInit } from "@angular/core";
import { TipoBotao } from "src/app/models/enum/tipoBotao.model";
import { ButtonModel } from "src/app/models/interface/button.model";
import { InputModel } from "src/app/models/interface/input.model";
import { Properties } from "src/app/models/interface/properties.model";
import { Obra } from "src/app/models/objetos/obra.model";
import { GenericService } from "src/app/services/generic.service";
import { ObraService } from "src/app/services/obra.service";


@Component({
  selector: 'screen-obra-cadastro',
  templateUrl: './screen-obra-cadastro.component.html',
  styleUrls: ['./screen-obra-cadastro.component.scss']
})
export class ScreenObraCadastroComponent implements OnInit {

  constructor(public tipoBotao : TipoBotao,
              public obraService : ObraService,
              private generic : GenericService) { }

  ngOnInit(): void {
    this.carregaTela();
  }

  carregaTela(){
    //todo alterar para passar a empresa tbm
    this.obraService.getObras(new Obra(), null, 50).subscribe(
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
  }


  obra : Obra = new Obra();
  inputDsObra = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDtLancamento = new InputModel({label: 'Data Lcto', placeholder: 'Insira a data'});
  buttonCadastrarObra: ButtonModel = new ButtonModel({ label: 'Cadastrar' });

  gridObra: Obra[] = [];

  onClickCadastrarObra(){
    this.buttonCadastrarObra.isRequesting = true;
    this.obraService.createObra(this.obra).subscribe(
      (response) => {
        this.generic.showSuccess("Obra ("+this.obra.dsObra.trim()+") cadastrada com sucesso!");
        this.obra = response;
        /*adiciona a esquadria no topo do grid para manipular alguma coisa, caso o usuario queira*/
        this.gridObra.splice(0,0,this.obra);
        this.gridObra[0].properties = new Map<string, Properties>();

        for(let name in this.obra){
          this.gridObra[0].properties.set(name, new Properties({ativo : false}));
        }
        // this.gridObra[0].properties = new Properties({ativo : false});
        this.gridObra[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
           [this.tipoBotao.CONFIRMAR, false],
           [this.tipoBotao.EDITAR, true],
           [this.tipoBotao.EXCLUIR, true]
        ]);

        this.obra = new Obra();
      },
      (error) => {
        this.generic.showError(error.error?.errors);
      }
    ).add(() =>{
      this.buttonCadastrarObra.isRequesting = false;
    });
  }

}
