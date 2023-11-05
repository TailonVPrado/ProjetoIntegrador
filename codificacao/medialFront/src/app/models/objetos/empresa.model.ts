import { Properties } from './../interface/properties.model';
export class Empresa{
  idEmpresa: number;
  nmEmpresa: string;
  stAtivo: boolean;
  properties: Properties;

  constructor(idEmpresa: number = 0, nmEmpresa: string = '', stAtivo: boolean = true, properties: Properties = new Properties({})){
    this.idEmpresa = idEmpresa;
    this.nmEmpresa = nmEmpresa;
    this.stAtivo  = stAtivo
    this.properties = properties;
  }
}
