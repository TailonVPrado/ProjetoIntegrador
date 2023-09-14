import { Empresa } from './empresa.model';
import { Linha } from './linha.model';
import { Properties } from '../interface/properties.model';

export class Perfil {
  idPerfil: number;
  dsPerfil: string;
  imPerfil: string;
  stAtivo: boolean;
  stNotContemImg: boolean;
  empresa: Empresa;
  linha: Linha;
  properties: Properties;
  visibilidadeBotoes: Map<string, boolean>;

  constructor(
    idPerfil: number = 0,
    dsPerfil: string = '',
    imPerfil: string = '',
    stAtivo: boolean = true,
    stNotContemImg: boolean = false,
    empresa: Empresa = new Empresa(),
    linha: Linha = new Linha(), properties: Properties = new Properties({}),
    visibilidadeBotoes: Map<string, boolean> = new Map<string, boolean>()
  ) {
    this.idPerfil = idPerfil;
    this.dsPerfil = dsPerfil;
    this.imPerfil = imPerfil;
    this.stAtivo = stAtivo;
    this.stNotContemImg = stNotContemImg;
    this.empresa = empresa;
    this.linha = linha;
    this.properties = properties;
    this.visibilidadeBotoes = visibilidadeBotoes;
  }
}
