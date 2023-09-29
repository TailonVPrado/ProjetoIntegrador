import { HttpClient, HttpParams} from '@angular/common/http';
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

}
