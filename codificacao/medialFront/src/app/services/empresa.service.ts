import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/objetos/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    const url = `${this.apiUrl}/empresa`;
    return this.http.post<Empresa>(url, empresa);
  }

  getEmpresaById(id: number): Observable<Empresa>{
    const url = `${this.apiUrl}/empresa/`+id;
    return this.http.get<Empresa>(url);
  }
}
