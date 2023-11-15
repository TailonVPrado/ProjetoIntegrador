import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

declare const require: any;
@Component({
  selector: 'tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  constructor() { }
  private packageJson = require('../../../../package.json'); // ajuste o caminho conforme necessário
  version: string = '';

  ngOnInit(): void {
    this.getVersion().subscribe((version: string) => {
      this.version = version;
    });
  }


  getVersion(): Observable<string> {
    const version = this.packageJson.version;
    return of(version);
  }

}
