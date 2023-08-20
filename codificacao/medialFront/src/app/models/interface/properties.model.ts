export class Properties {
  label: string;
  placeholder : string;
  ativo: boolean;
  visivel: boolean;

  constructor(config: PropertiesConfig = {}) {
    this.label = config.label ?? '';
    this.placeholder = config.placeholder ?? "";
    this.ativo = config.ativo ?? true;
    this.visivel = config.visivel ?? true;
  }
}

interface PropertiesConfig {
  label?: string;
  placeholder?: string;
  ativo?: boolean;
  visivel?: boolean;
}
