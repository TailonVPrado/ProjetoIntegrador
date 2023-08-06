import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Linha } from '../models/objetos/linha.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

  getLinhas(): Observable<Linha[]> {
    const url = `${this.apiUrl}/linha/all`;
    return this.http.get<Linha[]>(url);
  }
  getLinhasByDescricao(idEmpresa:number, dsLinha: string): Observable<Linha[]> {
    const url = `${this.apiUrl}/linha/descricao?idEmpresa=`+idEmpresa+`+&dsLinha=`+dsLinha;
    return this.http.get<Linha[]>(url);
  }
}
