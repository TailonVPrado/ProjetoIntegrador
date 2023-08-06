export class Empresa{
  idEmpresa: number;
  nmEmpresa: string;
  stAtivo: boolean;
/*todo
 * tirar o 1 fixo do ID, deixemos assim apenas para desenovlver a parte funcional, precisa deixar 0 e tratar os logins
 */
  constructor(idEmpresa: number = 1, nmEmpresa: string = '', stAtivo: boolean = true){
    this.idEmpresa = idEmpresa;
    this.nmEmpresa = nmEmpresa;
    this.stAtivo  = stAtivo
  }
}
