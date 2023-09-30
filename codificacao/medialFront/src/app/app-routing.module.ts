import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenLinhaComponent } from './screens/screen-linha/screen-linha.component';
import { ScreenPerfilComponent } from './screens/screen-perfil/screen-perfil.component';
import { ScreenEsquadriaComponent } from './screens/screen-esquadria/screen-esquadria.component';
import { ScreenDescontoComponent } from './screens/screen-desconto/screen-desconto.component';
import { ScreenCorteComponent } from './screens/screen-corte/screen-corte.component';
import { ScreenObraConsultaComponent } from './screens/screen-obra/screen-obra-consulta/screen-obra-consulta.component';
import { ScreenObraCadastroComponent } from './screens/screen-obra/screen-obra-cadastro/screen-obra-cadastro.component';
const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full' },
  {path: 'linha', component: ScreenLinhaComponent},
  {path: 'perfil', component: ScreenPerfilComponent},
  {path: 'esquadrias', component: ScreenEsquadriaComponent},
  {path: 'descontos', component: ScreenDescontoComponent},
  {path: 'obras/cadastro', component: ScreenObraCadastroComponent},
  {path: 'obras/consulta', component: ScreenObraConsultaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
