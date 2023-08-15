import { Empresa } from './empresa.model';
import { Linha } from './linha.model';
import { Properties } from '../interface/properties.model';

export class PerfilService {
  idPerfil: number;
  dsPerfil: string;
  imPerfil: string;
  stAtivo: boolean;
  empresa: Empresa;
  linha: Linha;
  properties: Properties;
  visibilidadeBotoes: Map<string, boolean>;

  constructor(
    idPerfil: number = 0,
    dsPerfil: string = '',
    imPerfil: string = '',
    stAtivo: boolean = true,
    empresa: Empresa = new Empresa(),
    linha: Linha = new Linha(), properties: Properties = new Properties({}),
    visibilidadeBotoes: Map<string, boolean> = new Map<string, boolean>()
  ) {
    this.idPerfil = idPerfil;
    this.dsPerfil = dsPerfil;
    this.imPerfil = imPerfil;
    this.stAtivo = stAtivo;
    this.empresa = empresa;
    this.linha = linha;
    this.properties = properties;
    this.visibilidadeBotoes = visibilidadeBotoes;
  }
}
