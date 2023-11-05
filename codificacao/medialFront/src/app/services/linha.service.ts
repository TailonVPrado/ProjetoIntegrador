import { Injectable } from '@angular/core';
import { Linha } from '../models/objetos/linha.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LinhaService {

  constructor(private http: HttpClient,
              private login: LoginService) { }

  private apiUrl = environment.apiUrl;

  createLinha(linha: Linha): Observable<Linha> {
    const url = `${this.apiUrl}/linha`;
    linha.empresa = this.login.getEmpresa();
    return this.http.post<Linha>(url, linha);
  }

  getLinhas(linha : Linha | any): Observable<Linha[]> {
    let params = new HttpParams();

    params = params.set('idEmpresa', this.login.getEmpresa().idEmpresa);

    if(linha?.dsLinha){
      params = params.set('dsLinha', linha.dsLinha);
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
