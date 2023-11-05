import { Properties } from './../interface/properties.model';
export class Empresa{
  idEmpresa: number;
  nmEmpresa: string;
  properties: Properties;

  constructor(idEmpresa: number = 0, nmEmpresa: string = '', properties: Properties = new Properties({})){
    this.idEmpresa = idEmpresa;
    this.nmEmpresa = nmEmpresa;
    this.properties = properties;
  }
}
