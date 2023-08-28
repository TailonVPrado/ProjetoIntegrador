import { Properties } from '../interface/properties.model';
import { Esquadria } from './esquadria.model';
import { Perfil } from './perfil.model';

export class PerfilEsquadria {
  idPerfilEsquadria: number;
  qtPerfil: number;
  dsDesconto: string;
  esquadria: Esquadria;
  perfil: Perfil;
  properties: Properties;
  visibilidadeBotoes: Map<string, boolean>;

  constructor(
    idPerfilEsquadria: number = 0,
    qtPerfil: number = 0,
    dsDesconto: string = '',
    esquadria: Esquadria = new Esquadria(),
    perfil: Perfil = new Perfil(),
    properties: Properties = new Properties({}),
    visibilidadeBotoes: Map<string, boolean> = new Map<string, boolean>()
  ) {
    this.idPerfilEsquadria = idPerfilEsquadria;
    this.qtPerfil = qtPerfil;
    this.dsDesconto = dsDesconto;
    this.esquadria = esquadria;
    this.perfil = perfil;
    this.properties = properties;
    this.visibilidadeBotoes = visibilidadeBotoes;
  }
}
