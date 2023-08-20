import { LinhaService } from './../../services/linha.service';
import { Perfil } from './../../models/objetos/perfil.model';
import { PerfilService } from './../../services/perfil.service';
import { tipoBotao } from 'src/app/models/enum/tipoBotao.model';
import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import { InputModel } from 'src/app/models/interface/input.model';
import { ButtonModel } from 'src/app/models/interface/button.model';
import { Properties } from 'src/app/models/interface/properties.model';
import { Linha } from 'src/app/models/objetos/linha.model';
import { Subscriber } from 'rxjs';

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
    private LinhaService : LinhaService
  ) { }

  ngOnInit(): void {
    this.LinhaService.getLinhas(null, null).subscribe(
      (linhas) => {
        linhas.forEach((linha, i) =>{
          this.linhasDisponiveis.set(linha.idLinha, linha.dsLinha);
        })
      }
    )
  }

  perfil : Perfil = new Perfil();
  inputDsPerfil = new InputModel({label: 'Descrição', placeholder: 'Insira a descrição'});
  inputDsLinha = new InputModel({label: 'Linha', placeholder: 'Linha'});

  linhasDisponiveis : Map<number, string> = new Map<number, string>();

  buttonCadastrar: ButtonModel = new ButtonModel({  });
  buttonConsultar: ButtonModel = new ButtonModel({ label: 'Consultar' });

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
  }


  private perfilOld : Perfil = new Perfil();
  efetuandoAltercao : boolean = false;
  onClickEditar(perfil : Perfil){

    this.perfilOld.dsPerfil = perfil.dsPerfil;
    this.perfilOld.linha.idLinha = perfil.linha.idLinha;
    this.perfilOld.linha.dsLinha = perfil.linha.dsLinha;
    this.efetuandoAltercao = true;

    perfil.properties.ativo = true;


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

  linhaSelecionada(id: any, perfil : Perfil){
    if(id == null){
      perfil.linha = new Linha();
    }else{
      this.LinhaService.getLinhaById(id).subscribe(
        (linha) => { perfil.linha = linha; }
        )
    }
  }

}
