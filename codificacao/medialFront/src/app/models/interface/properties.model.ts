export class Properties {
  label: string;
  placeholder : string;
  ativo: boolean;
  visivel: boolean;
  isRequesting: boolean;

  constructor(config: PropertiesConfig = {}) {
    this.label = config.label ?? '';
    this.placeholder = config.placeholder ?? "";
    this.ativo = config.ativo ?? true;
    this.visivel = config.visivel ?? true;
    this.isRequesting = config.isRequesting ?? false;
  }
}

interface PropertiesConfig {
  label?: string;
  placeholder?: string;
  ativo?: boolean;
  visivel?: boolean;
  isRequesting?: boolean;
}
