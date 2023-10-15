import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PerfilEsquadria } from '../models/objetos/perfilEsquadria.model';
import { Observable } from 'rxjs';
import { Obra } from '../models/objetos/obra.model';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  createObra(obra: Obra): Observable<any> {
    const url = `${this.apiUrl}/obra`;
    return this.http.post<any>(url, obra);
  }

  getObras(obra: Obra, limit : number = 0): Observable<Obra[]> {
    let params = new HttpParams();
    //todo alterar essa empresa logada aqui
    if(obra.empresa.idEmpresa){
      params = params.set('idEmpresa', obra.empresa.idEmpresa);
    }
    if(obra.dsObra){
      params = params.set('dsObra', obra.dsObra);
    }
    params = params.set('limit', limit);

    //todo fazer a parada para mandar a data ini e data fim no filtro

    const url = `${this.apiUrl}/obra/all`;
    return this.http.get<Obra[]>(url, {params});
  }
}
