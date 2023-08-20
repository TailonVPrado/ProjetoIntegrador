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

  createLinha(linha: Linha): Observable<any> {
    const url = `${this.apiUrl}/linha`;
    return this.http.post<any>(url, linha);
  }

  //todo alterar pegar o objeto inteiro da tela
  getLinhas(idEmpresa : number | any, dsLinha : string | any): Observable<Linha[]> {
    let params = new HttpParams();
    if(idEmpresa){
      params = params.set('idEmpresa', idEmpresa);
    }
    if(dsLinha){
      params = params.set('dsLinha', dsLinha);
    }

    const url = `${this.apiUrl}/linha/all`;
    return this.http.get<Linha[]>(url, {params});
  }

  getLinhasByDescricao(idEmpresa:number, dsLinha: string): Observable<Linha[]> {
    const url = `${this.apiUrl}/linha/descricao?idEmpresa=`+idEmpresa+`+&dsLinha=`+dsLinha;
    return this.http.get<Linha[]>(url);
  }

  updateLinha(linha: Linha): Observable<any> {
    const url = `${this.apiUrl}/linha`;
    return this.http.put<any>(url, linha);
  }

  deleteLinha(id: number): Observable<any> {
    const url = `${this.apiUrl}/linha/`+id;
    return this.http.delete<any>(url);
  }
}
