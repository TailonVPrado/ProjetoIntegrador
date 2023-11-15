import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaCorteComponent } from './telas/tela-corte/tela-corte.component';
import { TelaPerfilComponent } from './telas/tela-perfil/tela-perfil.component';
import { TelaLinhaComponent } from './telas/tela-linha/tela-linha.component';
import { TelaEsquadriaComponent } from './telas/tela-esquadria/tela-esquadria.component';
import { ButtonDefaultComponent } from './components/button-default/button-default.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { ButtonMenuComponent } from './components/button-menu/button-menu.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlertComponent } from './components/alert/alert.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputDateComponent } from './components/input-date/input-date.component';3
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { TelaObraCadastroComponent } from './telas/tela-obra/tela-obra-cadastro/tela-obra-cadastro.component';
import { GridObraComponent } from './telas/tela-obra/grid-obra/grid-obra.component';
import { InputDateRangeComponent } from './components/input-date-range/input-date-range.component';
import { ListBoxComponent } from './components/list-box/list-box.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ErrorInterceptor } from './intercept/error.intercept';
import { InputFormulaComponent } from './components/input-formula/input-formula.component';
import { PopoverComponent } from './components/popover/popover.component';
import { TelaObraConsultaComponent } from './telas/tela-obra/tela-obra-consulta/tela-obra-consulta.component';

defineLocale('pt-br', ptBrLocale); // Importe a localização para o português

@NgModule({
  declarations: [
    AppComponent,
    TelaCorteComponent,
    TelaEsquadriaComponent,
    TelaLinhaComponent,
    TelaPerfilComponent,
    ButtonDefaultComponent,
    ButtonIconComponent,
    ButtonMenuComponent,
    InputTextComponent,
    MenuBarComponent,
    AlertComponent,
    InputNumberComponent,
    InputDateComponent,
    GridObraComponent,
    TelaObraCadastroComponent,
    TelaObraConsultaComponent,
    InputDateRangeComponent,
    ListBoxComponent,
    CheckboxComponent,
    InputFormulaComponent,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-right',
    }),
    ModalModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    NgxCurrencyModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
