import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PerfilObraAgrupadoDto } from '../models/objetos/dto/PerfilObraAgrupadoDto.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilObraService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getPerfilObraAgrupado(idEsquadria : number, idObra : number, dsCor : string, tmLargura : number, tmAltura : number): Observable<PerfilObraAgrupadoDto[]> {
    const url = `${this.apiUrl}/perfilobra/perfilobraagrupado`;
    let params = new HttpParams();
    params = params.set('idEsquadria', idEsquadria);
    params = params.set('idObra', idObra);
    params = params.set('dsCor', dsCor);
    params = params.set('tmLargura', tmLargura);
    params = params.set('tmAltura', tmAltura);

    return this.http.get<PerfilObraAgrupadoDto[]>(url, {params});
  }

}
