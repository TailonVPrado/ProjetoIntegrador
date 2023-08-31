import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../components/alert/alert.component';
import { Empresa } from '../models/objetos/empresa.model';
import { tipoBotao } from '../models/enum/tipoBotao.model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private toastr: ToastrService,
    public modalService: BsModalService,
    private tipoBotao : tipoBotao
  ) { }

  public empresaLogada : Empresa = new Empresa(1);

  showSuccess(message : string, title : string = 'Sucesso!') {
    this.toastr.success(message, title);
  }

  showError(message : string, title : string =  'Erro!', ) {
    this.toastr.error(message, title);
  }

  showInformation(message : string, title : string = 'Informação!' ) {
    this.toastr.info(message, title);
  }

  showWarning(message : string, title : string = 'Atenção!' ) {
    this.toastr.warning(message, title);
  }

  async showAlert(mensagem: string, btn1: string = 'sim', btn2: string = 'cancelar', titulo: string = 'Confirmação'): Promise<number> {
    let add = new ModalOptions();
    var initialState:any = {
      titulo,
      mensagem,
      labelBtn1: btn1,
      labelBtn2: btn2,
      modalService: this
    }
    add = {
      class : 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: initialState
    };

    const objModal: BsModalRef<any> = this.modalService.show(AlertComponent, add);

    return new Promise<number>((resolve) => {
      objModal.content.result.subscribe((result: number) => { resolve(result); });
    } );
  }

  onClickButtonEditar(obj : any){
    obj.visibilidadeBotoes.set(this.tipoBotao.EDITAR, false);
    obj.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, false);
    obj.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, true);
    obj.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, true);
    obj.properties.ativo = true;
  }

  onClickButtonCancelar(obj : any){
    obj.visibilidadeBotoes.set(this.tipoBotao.EDITAR, true);
    obj.visibilidadeBotoes.set(this.tipoBotao.EXCLUIR, true);
    obj.visibilidadeBotoes.set(this.tipoBotao.CANCELAR, false);
    obj.visibilidadeBotoes.set(this.tipoBotao.CONFIRMAR, false);
    obj.properties.ativo = false;
  }
}
