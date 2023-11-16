import { Properties } from "../../interface/properties.model";

export class PerfilObraAgrupadoDto {
  dsPerfil: string;
  tmPerfil: number;
  qtPerfil: number;
  cdEsquadriaObra: string;
  properties: Properties;

  constructor(
    dsPerfil: string = '',
    tmPerfil: number = 0,
    qtPerfil: number = 0,
    cdEsquadriaObra: string = '',
    properties: Properties = new Properties({})
  ) {
    this.dsPerfil = dsPerfil;
    this.tmPerfil = tmPerfil;
    this.qtPerfil = qtPerfil;
    this.cdEsquadriaObra = cdEsquadriaObra;
    this.properties = properties;
  }
}
