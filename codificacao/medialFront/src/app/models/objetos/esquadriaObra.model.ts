import { Properties } from "../interface/properties.model";
import { Esquadria } from "./esquadria.model";
import { Obra } from "./obra.model";

export class EsquadriaObra {
  idEsquadriaObra : number;
  cdEsquadriaObra : string;
  dsCor : string;
  tmAltura : number;
  tmLargura : number;
  esquadria : Esquadria;
  obra : Obra;
  properties: Properties;
  visibilidadeBotoes: Map<string, boolean>;

  constructor(
    idEsquadriaObra: number = 0,
    cdEsquadriaObra: string = '',
    dsCor: string = 'Vazio',
    tmAltura : number = 0,
    tmLargura : number = 0,
    esquadria: Esquadria = new Esquadria(),
    obra : Obra = new Obra(),
    properties: Properties = new Properties({}),
    visibilidadeBotoes: Map<string, boolean> = new Map<string, boolean>()
  ) {
    this.idEsquadriaObra = idEsquadriaObra;
    this.cdEsquadriaObra = cdEsquadriaObra;
    this.dsCor = dsCor;
    this.tmAltura = tmAltura;
    this.tmLargura = tmLargura;
    this.esquadria = esquadria;
    this.obra = obra;
    this.properties = properties;
    this.visibilidadeBotoes = visibilidadeBotoes;
  }
}
