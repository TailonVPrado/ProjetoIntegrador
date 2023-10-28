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

  createObra(obra: Obra): Observable<Obra> {
    const url = `${this.apiUrl}/obra`;
    return this.http.post<Obra>(url, obra);
  }

  getObras(obra: Obra, datasFiltro : Date[] | any = null ,limit : number = 0): Observable<Obra[]> {
    let params = new HttpParams();
    //todo alterar essa empresa logada aqui
    if(obra.empresa.idEmpresa){
      params = params.set('idEmpresa', obra.empresa.idEmpresa);
    }
    if(obra.dsObra){
      params = params.set('dsObra', obra.dsObra);
    }
    if(datasFiltro){
      params = params.set('dtLctoIni', datasFiltro[0]);
      params = params.set('dtLctoFim', datasFiltro[1]);
    }

    params = params.set('limit', limit);

    //todo fazer a parada para mandar a data ini e data fim no filtro

    const url = `${this.apiUrl}/obra/all`;
    return this.http.get<Obra[]>(url, {params});
  }

  deleteObra(obra : Obra) : Observable<Obra> {
    const url = `${this.apiUrl}/obra/`+obra.idObra;
    return this.http.delete<Obra>(url);
  }

  updateObra(obra: Obra): Observable<Obra> {
    const url = `${this.apiUrl}/obra`;
    return this.http.put<Obra>(url, obra);
  }

}
