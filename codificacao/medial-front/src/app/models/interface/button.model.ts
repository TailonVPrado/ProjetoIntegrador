export class ButtonModel {
  label: string;
  ativo: boolean;
  visivel: boolean;

  constructor(config: ButtonModelConfig= {}){
    this.label = config.label ?? '',
    this.ativo = config.ativo ?? true,
    this.visivel = config.visivel ?? true
  }
}

interface ButtonModelConfig{
  label?: string;
  ativo?: boolean;
  visivel?: boolean;
}
