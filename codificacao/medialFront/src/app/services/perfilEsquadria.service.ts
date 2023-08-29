import { HttpClient} from '@angular/common/http';
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
}
