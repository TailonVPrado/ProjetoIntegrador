import { LinhaService } from './../../services/linha.service';
import { Perfil } from './../../models/objetos/perfil.model';
import { PerfilService } from './../../services/perfil.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import { InputModel } from 'src/app/models/interface/input.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoBotao } from 'src/app/models/enum/tipoBotao.model';

@Component({
  selector: 'screen-perfil',
  templateUrl: './screen-perfil.component.html',
  styleUrls: ['./screen-perfil.component.scss']
})
export class ScreenPerfilComponent implements OnInit {

  constructor(
    private generic : GenericService,
    public tipoBotao: TipoBotao,
    private perfilService : PerfilService,
    private linhaService : LinhaService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.linhaService.getLinhas(null, null).subscribe(
      (linhas) => {
        linhas.forEach((linha) =>{
          this.linhasDisponiveis.set(linha.idLinha, linha.dsLinha);
        })
      }
    )
  }

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  perfil : Perfil = new Perfil();
  inputDsPerfil = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDsLinha = new InputModel({label: 'Linha', placeholder: 'Linha'});

  linhasDisponiveis : Map<number, string> = new Map<number, string>();

  buttonCadastrar: ButtonModel = new ButtonModel({  });
  buttonConsultar: ButtonModel = new ButtonModel({ label: 'Consultar' });
  /*modal de alteração de umagem*/
  buttonSalvarImg: ButtonModel = new ButtonModel({ label: 'Salvar' });
  buttonRemoverImg: ButtonModel = new ButtonModel({ label: 'Remover Imagem' });
  buttonCancelarImg: ButtonModel = new ButtonModel({ label: 'Cancelar' });

  gridPerfil: Perfil[] = [];

  onClickConsultar(){
    this.carregaPerfil();
  }

  onClickCadastrar(){
    this.perfilService.createPerfil(this.perfil).subscribe(
      (response) => {
        this.generic.showSuccess("Perfil ("+this.perfil.dsPerfil.trim()+") cadastrado com sucesso!");
        this.perfil.idPerfil = response.idPerfil;
        this.perfil.stNotContemImg = true;
        /*adiciona o perfil na primeira linha para facilitar a experiencia do usuário*/
        this.gridPerfil.splice(0,0,this.perfil);
        this.gridPerfil[0].properties = new Properties({ativo : false});
        this.gridPerfil[0].visibilidadeBotoes = new Map <string, boolean>([
          [this.tipoBotao.CANCELAR, false],
          [this.tipoBotao.CONFIRMAR, false],
          [this.tipoBotao.EDITAR, true],
          [this.tipoBotao.EXCLUIR, true],
          [this.tipoBotao.IMAGEM, true]
        ]);

        this.perfil = new Perfil;
      },
      (error) => {
        this.generic.showError(error.error.errors[0]);
      }
    );
  }

  carregaPerfil(){
    //todo alterar para passar a empresa tbm
    this.perfilService.getPerfil(this.perfil).subscribe(
      (perfis) => {
        this.gridPerfil = [];
        perfis.forEach((perfil, i) =>{
          this.gridPerfil[i] = perfil;
          this.gridPerfil[i].properties = new Properties({ativo : false});
          this.gridPerfil[i].visibilidadeBotoes = new Map <string, boolean>([
            [this.tipoBotao.CANCELAR, false],
             [this.tipoBotao.CONFIRMAR, false],
             [this.tipoBotao.EDITAR, true],
             [this.tipoBotao.EXCLUIR, true],
             [this.tipoBotao.IMAGEM, true]
          ])
        });
        if(this.gridPerfil.length == 0){
          this.generic.showInformation("Nenhum registro foi encontrado.");
        }
      },
      (error) => {
        this.generic.showError('Erro ao carregar perfis:', error.error.error[0]);
      }
    )
    this.efetuandoAltercao = false;
  }

  private perfilOld : Perfil = new Perfil();
  efetuandoAltercao : boolean = false;
  onClickEditar(perfil : Perfil){
    if(!this.efetuandoAltercao){

      this.generic.onClickButtonEditar(perfil);

      this.perfilOld.dsPerfil = perfil.dsPerfil;
      this.perfilOld.linha.idLinha = perfil.linha.idLinha;
      this.perfilOld.linha.dsLinha = perfil.linha.dsLinha;

      this.efetuandoAltercao = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração conclua a anterior primeiro.');
    }
  }

  async onClickCancelar(perfil : Perfil){
    if(perfil.dsPerfil != this.perfilOld.dsPerfil ||
       perfil.linha.idLinha != this.perfilOld.linha.idLinha){
          if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){//1 = SIM
            this.generic.onClickButtonCancelar(perfil);

            this.efetuandoAltercao = false;

            perfil.dsPerfil = this.perfilOld.dsPerfil;
            perfil.linha.idLinha = this.perfilOld.linha.idLinha;
            perfil.linha.dsLinha = this.perfilOld.linha.dsLinha;
          }
        }else{
          this.generic.onClickButtonCancelar(perfil);
          this.efetuandoAltercao = false;
        }
  }

  async onClickExcluir(perfil : Perfil, idx : number){
    if(await this.generic.showAlert('Deseja realmente remover este perfil?') == 1){
      this.perfilService.deletePerfil(perfil).subscribe(
        (response) => {
          this.generic.showSuccess("Perfil ("+perfil.dsPerfil.trim()+") excluido com sucesso!");
          this.gridPerfil.splice(idx, 1);
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
        }
      );
    }
  }

  onClickConfirmar(perfil : Perfil){
    if(perfil.dsPerfil != this.perfilOld.dsPerfil || this.perfil.linha.idLinha != this.perfilOld.linha.idLinha){
      this.perfilService.updatePerfil(perfil).subscribe(
        (response) => {
          this.generic.showSuccess("Perfil ("+perfil.dsPerfil.trim()+") atualizado com sucesso!");

          this.generic.onClickButtonConfirmar(perfil);
          this.efetuandoAltercao = false;
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
        }
      );
    }else{
      this.generic.onClickButtonConfirmar(perfil);
      this.efetuandoAltercao = false;
    }
  }

  linhaSelecionada(id: any, perfil : Perfil){
    if(id == null){
      perfil.linha = new Linha();
    }else{
      this.linhaService.getLinhaById(id).subscribe(
        (linha) => { perfil.linha = linha; }
        )
    }
  }

  nameImageSelect : string = '';//data:image/jpeg;base64,
  imagePerfilBase64 : string | any = '';
  perfilImage : Perfil = new Perfil();
  onClickAlterImage(template: TemplateRef<any>, perfil:Perfil) {
    this.modalRef = this.modalService.show(template, this.config);
    this.perfilService.getImage(perfil.idPerfil).subscribe(
      (base64Image: string) => {
        this.imagePerfilBase64 = base64Image;
      },
      (error) => {
        this.generic.showError("Ocorreu um erro inesperado ao carregar a imagem, entre em contato com um administrador do sistema.");
      }
    );
    this.perfilImage = perfil;
    this.nameImageSelect = '';
  }

  onClickButtonSalvarImg(){
    this.perfilService.updateImage(this.perfilImage.idPerfil, this.imagePerfilBase64).subscribe(
      (base64Image: string) => {
        this.generic.showSuccess("Imagem atualizada com sucesso");
        this.modalRef?.hide();
        if(this.imagePerfilBase64){
          this.perfilImage.stNotContemImg = false;
        }else{
          this.perfilImage.stNotContemImg = true;
        }
      },
      (error) => {
        console.error('Ocorreu um erro inesperado ao salvar a imagem. Erro: ', error);
      }
    );
  }

  onChangeImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.nameImageSelect = file.name;
      const reader = new FileReader();
      reader.onload = (e) =>{
        this.imagePerfilBase64 = e.target?.result;
      }
      reader.readAsDataURL(file);
    }else {
      this.nameImageSelect = '';
    }
  }
}
