import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenLinhaComponent } from './screens/screen-linha/screen-linha.component';
import { ScreenPerfilComponent } from './screens/screen-perfil/screen-perfil.component';
import { ScreenEsquadriaComponent } from './screens/screen-esquadria/screen-esquadria.component';
import { ScreenDescontoComponent } from './screens/screen-desconto/screen-desconto.component';
import { ScreenObraComponent } from './screens/screen-obra/screen-obra.component';
import { ScreenCorteComponent } from './screens/screen-corte/screen-corte.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonExcluirComponent } from './components/button-excluir/button-excluir.component';
import { ButtonSalvarComponent } from './components/button-salvar/button-salvar.component';
import { ButtonEditarComponent } from './components/button-editar/button-editar.component';
import { ButtonCancelarComponent } from './components/button-cancelar/button-cancelar.component';
import { ButtonDefaultComponent } from './components/button-default/button-default.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ButtonMenuComponent } from './components/button-menu/button-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenLinhaComponent,
    ScreenPerfilComponent,
    ScreenEsquadriaComponent,
    ScreenDescontoComponent,
    ScreenObraComponent,
    ScreenCorteComponent,
    InputTextComponent,
    ButtonExcluirComponent,
    ButtonSalvarComponent,
    ButtonEditarComponent,
    ButtonCancelarComponent,
    ButtonDefaultComponent,
    MenuBarComponent,
    ButtonMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
