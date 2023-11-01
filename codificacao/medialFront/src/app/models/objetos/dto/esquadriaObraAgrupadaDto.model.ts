import { Properties } from "../../interface/properties.model";

export class EsquadriaObraAgrupadaDto {
  idObra: number;
  idEsquadria: number;
  dsEsquadria: string;
  dsCor: string;
  tmLargura: number;
  tmAltura: number;
  qtde: number;
  cdEsquadriaObra: string;
  properties: Properties;

  constructor(
    idObra: number = 0,
    idEsquadria: number = 0,
    dsEsquadria: string = '',
    dsCor: string = '',
    tmLargura: number = 0,
    tmAltura: number = 0,
    qtde: number = 0,
    cdEsquadriaObra: string = '',
    properties: Properties = new Properties({})
  ) {
    this.idObra = idObra;
    this.idEsquadria = idEsquadria;
    this.dsEsquadria = dsEsquadria;
    this.dsCor = dsCor;
    this.tmLargura = tmLargura;
    this.tmAltura = tmAltura;
    this.qtde = qtde;
    this.cdEsquadriaObra = cdEsquadriaObra;
    this.properties = properties;
  }
}
