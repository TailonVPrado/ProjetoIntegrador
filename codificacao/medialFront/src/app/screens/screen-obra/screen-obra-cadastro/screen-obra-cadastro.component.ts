import { Component, OnInit } from "@angular/core";
import { TipoBotao } from "src/app/models/enum/tipoBotao.model";
import { ButtonModel } from "src/app/models/interface/button.model";
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
    //TODO
    // depois que fizer a implementação do login da para tirar esse timeOut
    // so precisa dele porque a tela nao consegue acessar as informações de login porque carrega antes (nao adiantou por no afterViewInit)
    setTimeout(() => {
      this.carregaTela();
    }, 100);
  }

  carregaTela(){
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
        if(error.error.errors)
          this.generic.showError(error.error.errors, 'Erro ao carregar Obras');
      }
    )
  }


  obra : Obra = new Obra();
  inputDsObra = new Properties({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDtLancamento = new Properties({label: 'Data Lcto', placeholder: 'Insira a data'});
  buttonCadastrarObra: ButtonModel = new ButtonModel({ label: 'Cadastrar' });

  gridObra: Obra[] = [];

  onClickCadastrarObra(){
    this.buttonCadastrarObra.isRequesting = true;
    this.obraService.createObra(this.obra).subscribe(
      (response) => {
        this.generic.showSuccess("Obra ("+response.dsObra+") cadastrada com sucesso!");
        this.obra = response;
        this.obra.dtLancamento = this.generic.formataData(this.obra.dtLancamento);
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
        if(error.error.errors)
          this.generic.showError(error.error.errors, "Erro ao cadastrar Obra");
      }
    ).add(() =>{
      this.buttonCadastrarObra.isRequesting = false;
    });
  }

}
