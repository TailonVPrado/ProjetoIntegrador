export class InputModel {
  label: string;
  placeholder : string;
  ativo: boolean;
  visivel: boolean;
  idSelecionado : number | any;

  constructor(config: InputModelConfig = {}) {
    this.label = config.label ?? '';
    this.placeholder = config.placeholder ?? "";
    this.ativo = config.ativo ?? true;
    this.visivel = config.visivel ?? true;
    this.idSelecionado = config.idSelecionado ?? '';
  }
}

interface InputModelConfig {
  label?: string;
  placeholder?: string;
  ativo?: boolean;
  visivel?: boolean;
  idSelecionado?: number;
}
