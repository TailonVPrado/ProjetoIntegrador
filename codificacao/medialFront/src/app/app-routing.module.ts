import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLinhaComponent } from './telas/tela-linha/tela-linha.component';
import { TelaPerfilComponent } from './telas/tela-perfil/tela-perfil.component';
import { TelaEsquadriaComponent } from './telas/tela-esquadria/tela-esquadria.component';
import { TelaCorteComponent } from './telas/tela-corte/tela-corte.component';
import { TelaObraCadastroComponent } from './telas/tela-obra/tela-obra-cadastro/tela-obra-cadastro.component';
import { TelaObraConsultaComponent } from './telas/tela-obra/tela-obra-consulta/tela-obra-consulta.component';
const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full' },
  {path: 'linha', component: TelaLinhaComponent},
  {path: 'perfil', component: TelaPerfilComponent},
  {path: 'esquadrias', component: TelaEsquadriaComponent},
  {path: 'obras/cadastro', component: TelaObraCadastroComponent},
  {path: 'obras/consulta', component: TelaObraConsultaComponent},
  {path: 'cortes', component: TelaCorteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
