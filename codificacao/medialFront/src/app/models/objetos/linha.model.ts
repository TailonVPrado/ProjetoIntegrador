import { Properties } from "../interface/properties.model";
import { Empresa } from "./empresa.model";

export class Linha{
  idLinha: number;
  dsLinha: string;
  stAtivo: boolean;
  empresa: Empresa;
  properties : Properties;
  visibilidadeBotoes : Map<string, boolean>;

  constructor(idLinha: number = 0, dsLinha: string = '', stAtivo: boolean = true, empresa: Empresa = new Empresa(), properties: Properties = new Properties({}), visibilidadeBotoes : Map <string, boolean> = new Map<string, boolean>()){
    this.idLinha = idLinha;
    this.dsLinha = dsLinha;
    this.stAtivo = stAtivo;
    this.empresa = empresa;
    this.properties = properties;
    this.visibilidadeBotoes = visibilidadeBotoes;
  }
}
