import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PerfilEsquadria } from '../models/objetos/perfilEsquadria.model';
import { Observable } from 'rxjs';
import { Obra } from '../models/objetos/obra.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient,
              private login: LoginService) { }

  private apiUrl = environment.apiUrl;

  createObra(obra: Obra): Observable<Obra> {
    const url = `${this.apiUrl}/obra`;
    obra.empresa = this.login.getEmpresa();
    return this.http.post<Obra>(url, obra);
  }

  getObras(obra: Obra, datasFiltro : Date[] | any = null ,limit : number = 0, retornarObrasJaImpressas : boolean = true): Observable<Obra[]> {
    let params = new HttpParams();

    params = params.set('idEmpresa', this.login.getEmpresa().idEmpresa);

    if(obra.dsObra){
      params = params.set('dsObra', obra.dsObra);
    }
    if(datasFiltro){
      params = params.set('dtLctoIni', datasFiltro[0]);
      params = params.set('dtLctoFim', datasFiltro[1]);
    }

    params = params.set('limit', limit);
    params = params.set('retornarObrasJaImpressas', retornarObrasJaImpressas);

    const url = `${this.apiUrl}/obra/all`;
    return this.http.get<Obra[]>(url, {params});
  }

  deleteObra(obra : Obra) : Observable<Obra> {
    const url = `${this.apiUrl}/obra/`+obra.idObra;
    return this.http.delete<Obra>(url);
  }

  updateObra(obra: Obra): Observable<Obra> {
    const url = `${this.apiUrl}/obra/`+obra.idObra;
    return this.http.put<Obra>(url, obra);
  }

  recalcularDescontos(obra: Obra): Observable<any> {
    const url = `${this.apiUrl}/obra/recalcualarDescontos/`+obra.idObra;
    return this.http.put<Obra>(url, null);
  }

  gerarRelatorio(obra : Obra) {
    const url = `${this.apiUrl}/obra/gerarRelatorio/`+obra.idObra;

    // Faz a solicitação HTTP usando o HttpClient
    // Faz a solicitação HTTP usando o HttpClient
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        // Cria uma URL temporária para o Blob
        const url = window.URL.createObjectURL(blob);

        // Abre uma nova guia com a URL
        window.open(url, '_blank');

        // Libera a URL temporária quando a guia é fechada
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.error('Erro:', error);
      }
    );
  }

}
"C:\\Users\\tailon.prado\\Desktop\\trabalhos faculdade\\Projeto Integrado\\codificacao\\MedialApi\\src\\main\\resources\\relatorios"
