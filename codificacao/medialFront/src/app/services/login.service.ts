import { Injectable } from '@angular/core';
import { Empresa } from '../models/objetos/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private empresa : Empresa = new Empresa;
  setEmpresa(empresa : Empresa){this.empresa = empresa;}
  getEmpresa(){return this.empresa;}

}
