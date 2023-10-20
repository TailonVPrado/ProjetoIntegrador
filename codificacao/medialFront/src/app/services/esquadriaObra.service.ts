import { EsquadriaObra } from 'src/app/models/objetos/esquadriaObra.model';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { esUsLocale } from 'ngx-bootstrap/chronos';
import { PerfilEsquadria } from '../models/objetos/perfilEsquadria.model';

@Injectable({
  providedIn: 'root'
})
export class EsquadriaObraService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getEsquadriasObra(esquadriaObra: EsquadriaObra): Observable<EsquadriaObra[]> {
    let params = new HttpParams();
    //todo alterar essa empresa logada aqui
    if(esquadriaObra.obra.idObra){
      params = params.set('idObra', esquadriaObra.obra.idObra);
    }
    if(esquadriaObra.esquadria.idEsquadria){
      params = params.set('idEsquadria', esquadriaObra.esquadria.idEsquadria);
    }

    const url = `${this.apiUrl}/esquadriaobra/all`;
    return this.http.get<EsquadriaObra[]>(url, {params});
  }

  createEsquadriaObra(esquadriaObra : EsquadriaObra): Observable<any>{
    const url = `${this.apiUrl}/esquadriaobra`;

    //todo tirar a cor da esquadria aqui
    esquadriaObra.dsCor = 'Preto';
    return this.http.post<EsquadriaObra[]>(url, esquadriaObra);
  }

  desvinculaEsquadria(esquadriaObra : EsquadriaObra) : Observable<PerfilEsquadria>{
    const url = `${this.apiUrl}/esquadriaobra/`+esquadriaObra.idEsquadriaObra;
    return this.http.delete<any>(url);
  }
}
