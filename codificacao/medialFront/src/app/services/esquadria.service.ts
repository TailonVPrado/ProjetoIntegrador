import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Esquadria } from '../models/objetos/esquadria.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EsquadriaService {

  constructor(private http: HttpClient,
              private login: LoginService) { }

  private apiUrl = environment.apiUrl;

  createEsquadria(esquadria: Esquadria): Observable<Esquadria> {
    const url = `${this.apiUrl}/esquadria`;
    esquadria.empresa = this.login.getEmpresa();
    return this.http.post<Esquadria>(url, esquadria);
  }

  getEsquadrias(esquadria: Esquadria): Observable<Esquadria[]> {
    let params = new HttpParams();

    params = params.set('idEmpresa', this.login.getEmpresa().idEmpresa);

    if(esquadria.dsEsquadria){
      params = params.set('dsEsquadria', esquadria.dsEsquadria);
    }
    if(esquadria.linha.idLinha){
      params = params.set('idLinha', esquadria.linha.idLinha);
    }

    const url = `${this.apiUrl}/esquadria/all`;
    return this.http.get<Esquadria[]>(url, {params});
  }

  deleteEsquadria(esquadria: Esquadria): Observable<Esquadria> {
    const url = `${this.apiUrl}/esquadria/`+esquadria.idEsquadria;
    return this.http.delete<Esquadria>(url);
  }

  updateEsquadria(esquadria: Esquadria): Observable<Esquadria> {
    const url = `${this.apiUrl}/esquadria`;
    return this.http.put<Esquadria>(url, esquadria);
  }

  getEsquadriaById(id: number): Observable<Esquadria>{
    const url = `${this.apiUrl}/esquadria/`+id;
    return this.http.get<Esquadria>(url);
  }
}
