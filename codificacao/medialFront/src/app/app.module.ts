import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenCorteComponent } from './screens/screen-corte/screen-corte.component';
import { ScreenPerfilComponent } from './screens/screen-perfil/screen-perfil.component';
import { ScreenObraComponent } from './screens/screen-obra/screen-obra.component';
import { ScreenLinhaComponent } from './screens/screen-linha/screen-linha.component';
import { ScreenEsquadriaComponent } from './screens/screen-esquadria/screen-esquadria.component';
import { ScreenDescontoComponent } from './screens/screen-desconto/screen-desconto.component';
import { ButtonDefaultComponent } from './components/button-default/button-default.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { ButtonMenuComponent } from './components/button-menu/button-menu.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ScreenCorteComponent,
    ScreenDescontoComponent,
    ScreenEsquadriaComponent,
    ScreenLinhaComponent,
    ScreenObraComponent,
    ScreenPerfilComponent,
    ButtonDefaultComponent,
    ButtonIconComponent,
    ButtonMenuComponent,
    InputTextComponent,
    MenuBarComponent
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
