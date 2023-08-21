import { LinhaService } from './../../services/linha.service';
import { Perfil } from './../../models/objetos/perfil.model';
import { PerfilService } from './../../services/perfil.service';
import { tipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import { InputModel } from 'src/app/models/interface/input.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { Subscriber } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'screen-perfil',
  templateUrl: './screen-perfil.component.html',
  styleUrls: ['./screen-perfil.component.scss']
})
export class ScreenPerfilComponent implements OnInit {

  constructor(
    private generic : GenericService,
    public tipoBotao: tipoBotao,
    private perfilService : PerfilService,
    private LinhaService : LinhaService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.LinhaService.getLinhas(null, null).subscribe(
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
  botoesGrid: Map<string, boolean> | undefined;


  onClickConsultar(){
    this.carregaPerfil();
  }

  onClickCadastrar(){
    this.perfilService.createPerfil(this.perfil).subscribe(
      (response) => {
        this.generic.showSuccess("Linha ("+this.perfil.dsPerfil.trim()+") cadastrado com sucesso!");
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
        this.generic.showError('Erro ao carregar perfis:', error);
      }
    )
    this.efetuandoAltercao = false;
  }

  private perfilOld : Perfil = new Perfil();
  efetuandoAltercao : boolean = false;
  onClickEditar(perfil : Perfil){
    if(!this.efetuandoAltercao){
      perfil.visibilidadeBotoes.set(this.tipoBotao.EDITAR, false);
      perfil.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, false);
      perfil.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, true);
      perfil.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, true);

      this.perfilOld.dsPerfil = perfil.dsPerfil;
      this.perfilOld.linha.idLinha = perfil.linha.idLinha;
      this.perfilOld.linha.dsLinha = perfil.linha.dsLinha;
      this.efetuandoAltercao = true;

      perfil.properties.ativo = true;
    }else{
      this.generic.showWarning('Para realizar esta alteração conclua a anterior primeiro.');
    }
  }

  async onClickCancelar(perfil : Perfil){
    if(perfil.dsPerfil != this.perfilOld.dsPerfil ||
       perfil.linha.idLinha != this.perfilOld.linha.idLinha){
          if(await this.generic.showAlert('Deseja cancelar a alteração?','sim','não') == 1){//1 = SIM
            perfil.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
            perfil.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
            perfil.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
            perfil.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
            perfil.properties.ativo = false;
            this.efetuandoAltercao = false;

            perfil.dsPerfil = this.perfilOld.dsPerfil;
            perfil.linha.idLinha = this.perfilOld.linha.idLinha;
            perfil.linha.dsLinha = this.perfilOld.linha.dsLinha;
          }
        }else{
          perfil.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
          perfil.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
          perfil.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
          perfil.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
          perfil.properties.ativo = false;
          this.efetuandoAltercao = false;
        }
  }

  async onClickExcluir(perfil : Perfil, idx : number){
    if(await this.generic.showAlert('Deseja realmente remover este perfil?') == 1){
      this.perfilService.deletePerfil(perfil.idPerfil).subscribe(
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
          perfil.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
          perfil.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
          perfil.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
          perfil.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
          perfil.properties.ativo = false;
          this.efetuandoAltercao = false;
        },
        (error) => {
          this.generic.showError(error.error.errors[0]);
        }
      );
    }else{
      perfil.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
      perfil.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
      perfil.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
      perfil.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
      perfil.properties.ativo = false;
      this.efetuandoAltercao = false;
    }
  }

  linhaSelecionada(id: any, perfil : Perfil){
    if(id == null){
      perfil.linha = new Linha();
    }else{
      this.LinhaService.getLinhaById(id).subscribe(
        (linha) => { perfil.linha = linha; }
        )
    }
  }

  nameImageSelect : string = '';//data:image/jpeg;base64,
  imagePerfilBase64 : string | any = '';
  idPerfilImage : number = 0;
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
    this.idPerfilImage = perfil.idPerfil;
    this.nameImageSelect = '';
  }

  onClickButtonSalvarImg(){
    this.perfilService.updateImage(this.idPerfilImage, this.imagePerfilBase64).subscribe(
      (base64Image: string) => {
        this.generic.showSuccess("Imagem atualizada com sucesso");
        this.modalRef?.hide();
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
