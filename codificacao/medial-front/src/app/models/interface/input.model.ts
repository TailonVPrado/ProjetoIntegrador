export class InputModel {
  label: string;
  placeholder : string;
  ativo: boolean;
  visivel: boolean;
  itensSemelhantes: Map<number, string>;

  constructor(config: InputModelConfig = {}) {
    this.label = config.label ?? '';
    this.placeholder = config.placeholder ?? '';
    this.ativo = config.ativo ?? true;
    this.visivel = config.visivel ?? true;
    this.itensSemelhantes = config.itensSemelhantes ?? new Map<number, string>();
  }
}

interface InputModelConfig {
  label?: string;
  placeholder?: string;
  ativo?: boolean;
  visivel?: boolean;
  itensSemelhantes?: Map<number, string>;
}
