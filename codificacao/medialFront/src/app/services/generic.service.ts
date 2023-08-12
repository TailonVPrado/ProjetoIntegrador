import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private toastr: ToastrService) { }

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


}
