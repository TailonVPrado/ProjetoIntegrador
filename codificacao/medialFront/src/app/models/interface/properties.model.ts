export class Properties {
  label: string;
  placeholder : string;
  ativo: boolean;
  visivel: boolean;
  itensSemelhantes: Map<number, string>;

  constructor(config: PropertiesConfig = {}) {
    this.label = config.label ?? '';
    this.placeholder = config.placeholder ?? "";
    this.ativo = config.ativo ?? true;
    this.visivel = config.visivel ?? true;
    this.itensSemelhantes = config.itensSemelhantes ?? new Map<number, string>();
  }
}

interface PropertiesConfig {
  label?: string;
  placeholder?: string;
  ativo?: boolean;
  visivel?: boolean;
  itensSemelhantes?: Map<number, string>;
}
