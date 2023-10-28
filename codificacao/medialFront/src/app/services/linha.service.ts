import { Injectable } from '@angular/core';
import { Linha } from '../models/objetos/linha.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinhaService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  createLinha(linha: Linha): Observable<Linha> {
    const url = `${this.apiUrl}/linha`;
    return this.http.post<Linha>(url, linha);
  }

  //todo alterar pegar o objeto inteiro da tela
  getLinhas(idEmpresa : number | any, dsLinha : string | any): Observable<Linha[]> {
    let params = new HttpParams();
    //todo alterar para pegar a empresa logada
    if(idEmpresa){
      params = params.set('idEmpresa', idEmpresa);
    }
    if(dsLinha){
      params = params.set('dsLinha', dsLinha);
    }

    const url = `${this.apiUrl}/linha/all`;
    return this.http.get<Linha[]>(url, {params});
  }

  updateLinha(linha: Linha): Observable<Linha> {
    const url = `${this.apiUrl}/linha`;
    return this.http.put<Linha>(url, linha);
  }

  deleteLinha(linha: Linha): Observable<Linha> {
    const url = `${this.apiUrl}/linha/`+linha.idLinha;
    return this.http.delete<Linha>(url);
  }
  getLinhaById(id: number): Observable<Linha>{
    const url = `${this.apiUrl}/linha/`+id;
    return this.http.get<Linha>(url);
  }
}
