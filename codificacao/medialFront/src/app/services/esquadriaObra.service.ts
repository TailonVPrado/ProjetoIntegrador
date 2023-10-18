import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PerfilEsquadria } from '../models/objetos/perfilEsquadria.model';
import { Observable } from 'rxjs';
import { EsquadriaObra } from '../models/objetos/esquadriaObra.model';

@Injectable({
  providedIn: 'root'
})
export class EsquadriaObraService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getEsquadriasObra(esquadriaObra: EsquadriaObra): Observable<EsquadriaObra[]> {
    let params = new HttpParams();
    //todo alterar essa empresa logada aqui
    if(esquadriaObra.obra.idObra){
      params = params.set('idObra', esquadriaObra.obra.idObra);
    }
    if(esquadriaObra.esquadria.idEsquadria){
      params = params.set('idEsquadria', esquadriaObra.esquadria.idEsquadria);
    }

    const url = `${this.apiUrl}/esquadriaobra/all`;
    return this.http.get<EsquadriaObra[]>(url, {params});
  }

}
