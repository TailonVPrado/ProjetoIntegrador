import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})export class TipoBotao{
  EXCLUIR : string = 'EXCLUIR';
  CONFIRMAR: string = 'CONFIRMAR';
  CANCELAR: string = 'CANCELAR';
  EDITAR:  string = 'EDITAR';
  IMAGEM: string = 'IMAGEM';
  DUPLICAR: string = 'DUPLICAR';
}
