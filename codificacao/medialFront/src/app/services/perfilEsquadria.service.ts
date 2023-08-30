import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PerfilEsquadria } from '../models/objetos/perfilEsquadria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilEsquadriaService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  createPerfilEsquadria(perfilEsquadria: PerfilEsquadria): Observable<any> {
    const url = `${this.apiUrl}/perfilesquadria`;
    return this.http.post<any>(url, perfilEsquadria);
  }

  getPerfilEsquadrias(perfilEsquadria: PerfilEsquadria): Observable<PerfilEsquadria[]> {
    let params = new HttpParams();
    //todo alterar essa empresa logada aqui
    if(perfilEsquadria.esquadria.idEsquadria){
      params = params.set('idEsquadria', perfilEsquadria.esquadria.idEsquadria);
    }
    if(perfilEsquadria.perfil.idPerfil){
      params = params.set('idPerfil', perfilEsquadria.perfil.idPerfil);
    }

    const url = `${this.apiUrl}/perfilesquadria/all`;
    return this.http.get<PerfilEsquadria[]>(url, {params});
  }
}
