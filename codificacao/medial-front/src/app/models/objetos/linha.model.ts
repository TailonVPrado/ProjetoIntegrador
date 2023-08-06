import { Empresa } from "./empresa.model";

export class Linha{
  idLinha: number;
  dsLinha: string;
  stAtivo: boolean;
  empresa: Empresa;

  constructor(idLinha: number = 0, dsLinha: string = '', stAtivo: boolean = true, empresa: Empresa = new Empresa()){
    this.idLinha = idLinha;
    this.dsLinha = dsLinha;
    this.stAtivo = stAtivo;
    this.empresa = empresa;
  }
}
