import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';
import { Empresa } from './models/objetos/empresa.model';
import { EmpresaService } from './services/empresa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private empresaService : EmpresaService,
              private loginService : LoginService){}
  //todo quando fazer o login precisa tirar esse workaround daqui
  ngOnInit(){
    this.empresaService.getEmpresaById(1).subscribe(
      (response) => {
        this.loginService.setEmpresa(response);
      },
      (error) =>{
        let empresa : Empresa = new Empresa();
        empresa.nmEmpresa = 'Medial';
        this.empresaService.createEmpresa(empresa).subscribe(
          (response) => {
            this.loginService.setEmpresa(response);
          }
        );
      }
    )
  }
}
