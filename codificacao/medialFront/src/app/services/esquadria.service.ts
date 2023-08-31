import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Esquadria } from '../models/objetos/esquadria.model';

@Injectable({
  providedIn: 'root'
})
export class EsquadriaService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  createEsquadria(esquadria: Esquadria): Observable<any> {
    const url = `${this.apiUrl}/esquadria`;
    return this.http.post<any>(url, esquadria);
  }

  getEsquadrias(esquadria: Esquadria): Observable<Esquadria[]> {
    let params = new HttpParams();
    //todo alterar essa empresa logada aqui
    if(esquadria.empresa.idEmpresa){
      params = params.set('idEmpresa', esquadria.empresa.idEmpresa);
    }
    if(esquadria.dsEsquadria){
      params = params.set('dsEsquadria', esquadria.dsEsquadria);
    }
    if(esquadria.linha.idLinha){
      params = params.set('idLinha', esquadria.linha.idLinha);
    }

    const url = `${this.apiUrl}/esquadria/all`;
    return this.http.get<Esquadria[]>(url, {params});
  }

  deleteEsquadria(esquadria: Esquadria): Observable<any> {
    const url = `${this.apiUrl}/esquadria/`+esquadria.idEsquadria;
    return this.http.delete<any>(url);
  }

  updateEsquadria(esquadria: Esquadria): Observable<any> {
    const url = `${this.apiUrl}/esquadria`;
    return this.http.put<any>(url, esquadria);
  }
}
