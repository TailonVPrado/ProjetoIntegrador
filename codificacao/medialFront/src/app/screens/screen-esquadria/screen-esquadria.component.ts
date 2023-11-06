import { PerfilEsquadriaService} from './../../services/perfilEsquadria.service';
import { PerfilEsquadria } from './../../models/objetos/perfilEsquadria.model';
import { Esquadria } from './../../models/objetos/esquadria.model';
import { EsquadriaService } from './../../services/esquadria.service';
import { Perfil } from './../../models/objetos/perfil.model';
import { LinhaService } from './../../services/linha.service';
import { TipoBotao } from './../../models/enum/tipoBotao.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { InputModel } from 'src/app/models/interface/input.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { GenericService } from 'src/app/services/generic.service';
import { Properties } from 'src/app/models/interface/properties.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'screen-esquadria',
  templateUrl: './screen-esquadria.component.html',
  styleUrls: ['./screen-esquadria.component.scss']
})
export class ScreenEsquadriaComponent implements OnInit {

  constructor(public tipoBotao : TipoBotao,
              private linhaService: LinhaService,
              private esquadriaService : EsquadriaService,
              private perfilService : PerfilService,
              private perfilEsquadriaService : PerfilEsquadriaService,
              private generic : GenericService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    //todo tvp
    // depois que fizer a implementação do login da para tirar esse timeOut
    // so precisa dele porque a tela nao consegue acessar as informações de login porque carrega antes (nao adiantou por no afterViewInit)
    setTimeout(() => {
      this.linhaService.getLinhas(null).subscribe(
        (linhas) => {
          linhas.forEach((linha) =>{
            this.linhasDisponiveis.set(linha.idLinha, linha.dsLinha);
          })
        }
      )
    }, 100);
  }

  linhasDisponiveis : Map<number, string> = new Map<number, string>();
  esquadria : Esquadria = new Esquadria();
  inputDsEsquadria = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDsLinha = new InputModel({label: 'Linha', placeholder: 'Linha'});
  buttonCadastrarEsquadria: ButtonModel = new ButtonModel({  });
  buttonConsultarEsquadria: ButtonModel = new ButtonModel({ label: 'Consultar' });

  gridEsquadria: Esquadria[] = [];

  linhaSelecionada(id: any, esquadria : Esquadria){
    if(id == null){
      esquadria.linha = new Linha();
    }else{
      this.linhaService.getLinhaById(id).subscribe(
        (linha) => { esquadria.linha = linha; }
        )
    }
  }

  onClickCadastrarEsquadria(){
    this.buttonCadastrarEsquadria.isRequesting = true;
    this.esquadriaService.createEsquadria(this.esquadria).subscribe(
      (response) => {
        this.generic.showSuccess("Esquadria ("+this.esquadria.dsEsquadria.trim()+") cadastrada com sucesso!");
        this.esquadria.idEsquadria = response.idEsquadria;
        /*adiciona a esquadria no topo do grid para manipular alguma coisa, caso o usuario queira*/
        this.gridEsquadria.splice(0,0,this.esquadria);
        this.gridEsquadria[0].properties = new Properties({ativo : false});
        this.gridEsquadria[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
           [this.tipoBotao.CONFIRMAR, false],
           [this.tipoBotao.EDITAR, true],
           [this.tipoBotao.EXCLUIR, true]
        ])

        this.esquadria = new Esquadria();
      },
      (error) => {
        if(error.error.errors)
          this.generic.showError(error.error.errors, "Erro ao cadastrar Esquadria");
      }
    ).add(() =>{
      this.buttonCadastrarEsquadria.isRequesting = false;
    });
  }

  onClickConsultarEsquadria(){
    this.carregaEsquadrias();
  }

  carregaEsquadrias() {
    this.buttonConsultarEsquadria.isRequesting = true;
    this.esquadriaService.getEsquadrias(this.esquadria).subscribe(
      (perfis) => {
        this.gridEsquadria = [];
        perfis.forEach((perfil, i) =>{
          this.gridEsquadria[i] = perfil;
          this.gridEsquadria[i].properties = new Properties({ativo : false});
          this.gridEsquadria[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true]
          ])
        });
        if(this.gridEsquadria.length == 0){
          this.generic.showInformation("Nenhum registro foi encontrado.");
        }
      },
      (error) => {
        if(error.error.errors)
          this.generic.showError( error.error.errors, 'Erro ao carregar Esquadrias');
      }
    ).add(() =>{
      this.buttonConsultarEsquadria.isRequesting = false;
    });
    this.efetuandoAltercaoEsquadria = false;
  }

  async onClickExcluirEsquadria(esquadria : Esquadria, idx : number){
    if(await this.generic.showAlert('Deseja realmente remover esta esquadria?') == 1){
      this.esquadriaService.deleteEsquadria(esquadria).subscribe(
        (response) => {
          this.generic.showSuccess("Esquadria ("+esquadria.dsEsquadria.trim()+") excluido com sucesso!");
          this.gridEsquadria.splice(idx, 1);
        },
        (error) => {
          if(error.error.errors)
            this.generic.showError(error.error.errors, "Erro ao excluir Esquadria");
        }
      );
    }
  }

  private esquadriaOld : Esquadria = new Esquadria();
  efetuandoAltercaoEsquadria : boolean = false;
  onClickEditarEsquadria(esquadria : Esquadria){
    if(!this.efetuandoAltercaoEsquadria){

      this.generic.onClickButtonEditar(esquadria);

      this.esquadriaOld.dsEsquadria = esquadria.dsEsquadria;
      this.esquadriaOld.linha.idLinha = esquadria.linha.idLinha;
      this.esquadriaOld.linha.dsLinha = esquadria.linha.dsLinha;

      this.efetuandoAltercaoEsquadria = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração, conclua a anterior primeiro.');
    }
  }

  async onClickCancelarEsquadria(esquadria : Esquadria){
    if(esquadria.dsEsquadria != this.esquadriaOld.dsEsquadria || esquadria.linha.idLinha != this.esquadriaOld.linha.idLinha){
      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){//1 = SIM

        this.generic.onClickButtonCancelar(esquadria);

        this.efetuandoAltercaoEsquadria = false;

        esquadria.dsEsquadria = this.esquadriaOld.dsEsquadria;
        esquadria.linha.idLinha = this.esquadriaOld.linha.idLinha;
        esquadria.linha.dsLinha = this.esquadriaOld.linha.dsLinha;
      }
    }else{
      this.generic.onClickButtonCancelar(esquadria);

      this.efetuandoAltercaoEsquadria = false;
    }
  }

  onClickConfirmarEsquadria(esquadria : Esquadria){
    if(esquadria.dsEsquadria != this.esquadriaOld.dsEsquadria || this.esquadria.linha.idLinha != this.esquadriaOld.linha.idLinha){
      this.esquadriaService.updateEsquadria(esquadria).subscribe(
        (response) => {
          this.generic.showSuccess("Esquadria ("+ esquadria.dsEsquadria.trim()+") atualizada com sucesso!");

          this.generic.onClickButtonConfirmar(esquadria);
          this.efetuandoAltercaoEsquadria = false;
        },
        (error) => {
          if(error.error.errors)
            this.generic.showError(error.error.errors, "Erro ao atualizar Esquadria");
        }
      );
    }else{
      this.generic.onClickButtonConfirmar(esquadria);
      this.efetuandoAltercaoEsquadria = false;
    }
  }

  /*      DAQUI PARA BAIXO COMECA A CODIFICAÇÃO REFERENTE AO VINCULO DE UM PERFIL COM UMA ESQUADRIA. tabela: PERFILESQUADRIA
   *      DAQUI PARA BAIXO COMECA A CODIFICAÇÃO REFERENTE AO VINCULO DE UM PERFIL COM UMA ESQUADRIA. tabela: PERFILESQUADRIA
   *      DAQUI PARA BAIXO COMECA A CODIFICAÇÃO REFERENTE AO VINCULO DE UM PERFIL COM UMA ESQUADRIA. tabela: PERFILESQUADRIA
   *      DAQUI PARA BAIXO COMECA A CODIFICAÇÃO REFERENTE AO VINCULO DE UM PERFIL COM UMA ESQUADRIA. tabela: PERFILESQUADRIA
  */

  configModal = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'full-size-modal'
  };

  perfilDisponiveis : Map<number, string> = new Map<number, string>();
  inputDsPerfil = new InputModel({label: 'Perfil', placeholder: 'Insira o Perfil'});
  inputQtdePerfil = new InputModel({label: 'Qtde', placeholder: '0'});
  inputDsDesconto = new InputModel({label: 'Desconto', placeholder: ''});

  perfilEsquadria : PerfilEsquadria = new PerfilEsquadria();
  buttonCadastrarPerfilEsquadria: ButtonModel = new ButtonModel({  });
  gridPerfilEsquadria : PerfilEsquadria[] = [];
  modalRef?: BsModalRef;

  efetuandoAltercaoPerfilEsquadria : boolean = false;
  private perfilEsquadriaOld : PerfilEsquadria = new PerfilEsquadria();
  titleModal : string = '';

  openModalPerfilEsquadria(template: TemplateRef<any>, esquadria: Esquadria){
    if(!esquadria.properties.ativo){
      this.perfilEsquadria = new PerfilEsquadria();

      this.titleModal = esquadria.dsEsquadria + '  (' + esquadria.linha.dsLinha +')'

      this.carregaPerfilEsquadrias(esquadria);

      let perfilFilter = new Perfil();
      perfilFilter.linha = esquadria.linha;
      this.perfilEsquadria.esquadria = esquadria;

      this.perfilDisponiveis = new Map<number, string>();
      this.perfilService.getPerfil(perfilFilter).subscribe(
        (response) => {
          response.forEach((perfil) =>{
            this.perfilDisponiveis.set(perfil.idPerfil, perfil.dsPerfil);
          })
        }
      );
      this.perfilEsquadria.perfil = new Perfil();
      this.modalRef = this.modalService.show(template, this.configModal);
    }
  }

  perfilSelecionado(id: any, perfilEsquadria : PerfilEsquadria){
    if(id == null){
      perfilEsquadria.perfil = new Perfil();
    }else{
      this.perfilService.getPerfilById(id).subscribe(
        (perfil) => { perfilEsquadria.perfil = perfil; }
      )
    }
  }

  carregaPerfilEsquadrias(esquadria: Esquadria) {
    let perfilEsquadriaFilter = new PerfilEsquadria();
    perfilEsquadriaFilter.esquadria = esquadria;

    this.perfilEsquadriaService.getPerfilEsquadrias(perfilEsquadriaFilter).subscribe(
      (perfilEsquadrias)=>{
        this.gridPerfilEsquadria = [];
        perfilEsquadrias.forEach((perfilEsquadria, i) => {
          this.gridPerfilEsquadria[i] = perfilEsquadria;
          this.gridPerfilEsquadria[i].properties = new Properties({ativo : false});
          this.gridPerfilEsquadria[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true]
          ])
        });

      }
    )
    this.efetuandoAltercaoPerfilEsquadria = false;
  }

  onClickCadastrarPerfilEsquadria(){
    this.buttonCadastrarPerfilEsquadria.isRequesting = true;
    this.perfilEsquadriaService.createPerfilEsquadria(this.perfilEsquadria).subscribe(
      (response) => {
        this.generic.showSuccess("Perfil ("+this.perfilEsquadria.perfil.dsPerfil+") vinculado a esquadria ("+ this.perfilEsquadria.esquadria.dsEsquadria +") com sucesso!");

        this.perfilEsquadria.idPerfilEsquadria = response.idPerfilEsquadria;
        this.perfilEsquadria.dsDesconto = response.dsDesconto;
        /*adiciona o perfil no topo do grid para manipular alguma coisa, caso o usuario queira*/
        this.gridPerfilEsquadria.splice(0,0,  Object.assign({}, this.perfilEsquadria) );
        this.gridPerfilEsquadria[0].properties = new Properties({ativo : false});
        this.gridPerfilEsquadria[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
           [this.tipoBotao.CONFIRMAR, false],
           [this.tipoBotao.EDITAR, true],
           [this.tipoBotao.EXCLUIR, true]
        ])

        this.perfilEsquadria.perfil = new Perfil();
        this.perfilEsquadria.idPerfilEsquadria = 0;
        this.perfilEsquadria.dsDesconto = '';
        this.perfilEsquadria.qtPerfil = 1;

      },
      (error) => {
        if(error.error.errors)
          this.generic.showError(error.error.errors, "Erro ao realizar vínculo");
      }
    ).add(() =>{
      this.buttonCadastrarPerfilEsquadria.isRequesting = false;
    });
  }

  async onClickExcluirPerfilEsquadria(perfilEsquadria: PerfilEsquadria, idx: number){
    if(await this.generic.showAlert('Deseja realmente desvincular este perfil?') == 1){
      this.perfilEsquadriaService.desvinculaPerfil(perfilEsquadria).subscribe(
        (response) => {
          this.generic.showSuccess("Perfil ("+perfilEsquadria.perfil.dsPerfil.trim()+") desvinculado com sucesso!");
          this.gridPerfilEsquadria.splice(idx, 1);
        },
        (error) => {
          if(error.error.errors)
            this.generic.showError(error.error.errors);
        }
      );
    }
  }

  onClickEditarPerfilEsquadria(perfilEsquadria: PerfilEsquadria){
    if(!this.efetuandoAltercaoPerfilEsquadria){

      this.generic.onClickButtonEditar(perfilEsquadria);

      this.perfilEsquadriaOld.perfil.idPerfil = perfilEsquadria.perfil.idPerfil;
      this.perfilEsquadriaOld.perfil.dsPerfil = perfilEsquadria.perfil.dsPerfil;
      this.perfilEsquadriaOld.qtPerfil = perfilEsquadria.qtPerfil;
      this.perfilEsquadriaOld.dsDesconto = perfilEsquadria.dsDesconto;

      this.efetuandoAltercaoPerfilEsquadria = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração, conclua a anterior primeiro.');
    }
  }

  async onClickCancelarPerfilEsquadria(perfilEsquadria: PerfilEsquadria){
    if( this.perfilEsquadriaOld.perfil.idPerfil != perfilEsquadria.perfil.idPerfil ||
        this.perfilEsquadriaOld.qtPerfil != perfilEsquadria.qtPerfil ||
        this.perfilEsquadriaOld.dsDesconto != perfilEsquadria.dsDesconto){

      if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){//1 = SIM

        this.generic.onClickButtonCancelar(perfilEsquadria);

        this.efetuandoAltercaoPerfilEsquadria = false;

        perfilEsquadria.perfil.idPerfil = this.perfilEsquadriaOld.perfil.idPerfil;
        perfilEsquadria.perfil.dsPerfil = this.perfilEsquadriaOld.perfil.dsPerfil;
        perfilEsquadria.qtPerfil = this.perfilEsquadriaOld.qtPerfil;
        perfilEsquadria.dsDesconto = this.perfilEsquadriaOld.dsDesconto;
      }
    }else{
      this.generic.onClickButtonCancelar(perfilEsquadria);

      this.efetuandoAltercaoPerfilEsquadria = false;
    }

  }

  onClickConfirmarPerfilEsquadria(perfilEsquadria: PerfilEsquadria){

    if( this.perfilEsquadriaOld.perfil.idPerfil != perfilEsquadria.perfil.idPerfil ||
        this.perfilEsquadriaOld.qtPerfil != perfilEsquadria.qtPerfil ||
        this.perfilEsquadriaOld.dsDesconto != perfilEsquadria.dsDesconto){

      this.perfilEsquadriaService.updatePerfilEsquadria(perfilEsquadria).subscribe(
        (response) => {
          this.generic.showSuccess("Vinculo do perfil ("+ perfilEsquadria.perfil.dsPerfil.trim()+") atualizado com sucesso!");

          this.generic.onClickButtonConfirmar(perfilEsquadria);
          this.efetuandoAltercaoPerfilEsquadria = false;
        },
        (error) => {
          if(error.error.errors)
            this.generic.showError(error.error.errors, "Erro ao atualizar vínculo");
        }
      );
    }else{
      this.generic.onClickButtonConfirmar(perfilEsquadria);
      this.efetuandoAltercaoPerfilEsquadria = false;
    }
  }

}
