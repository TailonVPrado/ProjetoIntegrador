export class ButtonModel {
  label: string;
  ativo: boolean;
  visivel: boolean;
  isRequesting : boolean;

  constructor(config: ButtonModelConfig= {}){
    this.label = config.label ?? '',
    this.ativo = config.ativo ?? true,
    this.visivel = config.visivel ?? true,
    this.isRequesting = config.isRequesting ?? false
  }
}

interface ButtonModelConfig{
  label?: string;
  ativo?: boolean;
  visivel?: boolean;
  isRequesting?: boolean;
}
