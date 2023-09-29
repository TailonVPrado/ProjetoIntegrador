import { Empresa } from './empresa.model';
import { Linha } from './linha.model';
import { Properties } from '../interface/properties.model';

export class Obra {
  idObra: number;
  dsObra: string;
  empresa: Empresa;
  dtLancamento : Date | any;
  stAtivo: boolean;
  stImpresso : boolean;
  nrVersao: number;
  properties: Properties;
  visibilidadeBotoes: Map<string, boolean>;

  constructor(
    idObra: number = 0,
    dsObra: string = '',
    empresa: Empresa = new Empresa(),
    dtLancamento : Date = new Date(),
    stAtivo: boolean = true,
    stImpresso: boolean = false,
    nrVersao: number = 0,
    properties: Properties = new Properties({}),
    visibilidadeBotoes: Map<string, boolean> = new Map<string, boolean>()
  ) {
    this.idObra = idObra;
    this.dsObra = dsObra;
    this.empresa = empresa;
    this.dtLancamento = dtLancamento;
    this.stAtivo = stAtivo;
    this.stImpresso = stImpresso;
    this.nrVersao = nrVersao;
    this.properties = properties;
    this.visibilidadeBotoes = visibilidadeBotoes;
  }
}
