import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Perfil } from '../models/objetos/perfil.model';
import { map, switchMap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient,
              private login: LoginService) { }

  private apiUrl = environment.apiUrl;

  createPerfil(perfil: Perfil): Observable<Perfil> {
    const url = `${this.apiUrl}/perfil`;
    perfil.empresa = this.login.getEmpresa();
    return this.http.post<Perfil>(url, perfil);
  }

  getPerfil(perfil: Perfil): Observable<Perfil[]> {
    let params = new HttpParams();

    params = params.set('idEmpresa', this.login.getEmpresa().idEmpresa);

    if(perfil.dsPerfil){
      params = params.set('dsPerfil', perfil.dsPerfil);
    }
    if(perfil.linha.idLinha){
      params = params.set('idLinha', perfil.linha.idLinha);
    }

    const url = `${this.apiUrl}/perfil/all`;
    return this.http.get<Perfil[]>(url, {params});
  }

  updatePerfil(perfil: Perfil): Observable<Perfil> {
    const url = `${this.apiUrl}/perfil/`+perfil.idPerfil;
    return this.http.put<Perfil>(url, perfil);
  }

  deletePerfil(perfil: Perfil): Observable<Perfil> {
    const url = `${this.apiUrl}/perfil/`+perfil.idPerfil;
    return this.http.delete<Perfil>(url);
  }

  updateImage(id: number, image: string): Observable<any>{
    const url = `${this.apiUrl}/perfil/updateImage/`+id;
    return this.http.put(url,  { image })
  }

  getImage(id : number): Observable<any>{
    const url = `${this.apiUrl}/perfil/getImage/`+id;
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      map((data: ArrayBuffer) => {
        const bytes = new Uint8Array(data);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        if(binary){
          return 'data:image/jpeg;base64,' + btoa(binary);
        }
        return "";
      })
    );
  }

  getPerfilById(id: number): Observable<Perfil>{
    const url = `${this.apiUrl}/perfil/`+id;
    return this.http.get<Perfil>(url);
  }
}
