import { EsquadriaObra } from 'src/app/models/objetos/esquadriaObra.model';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EsquadriaObraAgrupadaDto } from '../models/objetos/dto/esquadriaObraAgrupadaDto.model';

@Injectable({
  providedIn: 'root'
})
export class EsquadriaObraService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getEsquadriasObra(esquadriaObra: EsquadriaObra): Observable<EsquadriaObra[]> {
    let params = new HttpParams();

    if(esquadriaObra.obra.idObra){
      params = params.set('idObra', esquadriaObra.obra.idObra);
    }
    if(esquadriaObra.esquadria.idEsquadria){
      params = params.set('idEsquadria', esquadriaObra.esquadria.idEsquadria);
    }

    const url = `${this.apiUrl}/esquadriaobra/all`;
    return this.http.get<EsquadriaObra[]>(url, {params});
  }

  getEsquadriasObraAgrupadas(idObra: number): Observable<EsquadriaObraAgrupadaDto[]> {
    const url = `${this.apiUrl}/esquadriaobra/all/agrupado/`+idObra;
    return this.http.get<EsquadriaObraAgrupadaDto[]>(url);
  }

  createEsquadriaObra(esquadriaObra : EsquadriaObra): Observable<EsquadriaObra>{
    const url = `${this.apiUrl}/esquadriaobra`;
    return this.http.post<EsquadriaObra>(url, esquadriaObra);
  }

  desvinculaEsquadria(esquadriaObra : EsquadriaObra) : Observable<EsquadriaObra>{
    const url = `${this.apiUrl}/esquadriaobra/`+esquadriaObra.idEsquadriaObra;
    return this.http.delete<EsquadriaObra>(url);
  }

  updateEsquadriaObra(esquadriaObra: EsquadriaObra): Observable<EsquadriaObra> {
    const url = `${this.apiUrl}/esquadriaobra`;
    return this.http.put<EsquadriaObra>(url, esquadriaObra);
  }

  getCores() : Observable<string[]>{
    const url = `${this.apiUrl}/esquadriaobra/cores`;
    return this.http.get<string[]>(url);
  }

  retornaProximoCodigoEsquadria(value : string) : Observable<any>{
    let params = new HttpParams();
    params = params.set('cdCodigo', value);
    const url = `${this.apiUrl}/esquadriaobra/proximoCodigo`;
    return this.http.get(url, { params, responseType: 'text' });
  }

  duplicarEsquadriaObra(esquadriaObra : EsquadriaObra) : Observable<EsquadriaObra>{
    const url = `${this.apiUrl}/esquadriaobra/duplicar`;
    return this.http.post<EsquadriaObra>(url, esquadriaObra);
  }
}
