import { Empresa } from './empresa.model';
import { Linha } from './linha.model';
import { Properties } from '../interface/properties.model';

export class Esquadria {
  idEsquadria: number;
  dsEsquadria: string;
  empresa: Empresa;
  linha: Linha;
  properties: Properties;
  visibilidadeBotoes: Map<string, boolean>;

  constructor(
    idEsquadria: number = 0,
    dsEsquadria: string = '',
    empresa: Empresa = new Empresa(),
    linha: Linha = new Linha(),
    properties: Properties = new Properties({}),
    visibilidadeBotoes: Map<string, boolean> = new Map<string, boolean>()
  ) {
    this.idEsquadria = idEsquadria;
    this.dsEsquadria = dsEsquadria;
    this.empresa = empresa;
    this.linha = linha;
    this.properties = properties;
    this.visibilidadeBotoes = visibilidadeBotoes;
  }
}
