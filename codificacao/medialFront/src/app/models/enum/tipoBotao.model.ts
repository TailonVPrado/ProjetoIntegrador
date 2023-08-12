import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})export class tipoBotao{
  EXCLUIR : string = 'EXCLUIR';
  CONFIRMAR: string = 'CONFIRMAR';
  CANCELAR: string = 'CANCELAR';
  EDITAR:  string = 'EDITAR';
}
