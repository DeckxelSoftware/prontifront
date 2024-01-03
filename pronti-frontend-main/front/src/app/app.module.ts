import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateUpdateModalModule} from './componentes/dialog/create-update-modal/create-update-modal.module';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BlockUIModule} from 'primeng/blockui';
import {ToastModule} from 'primeng/toast';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RutaEjemploComponent} from './rutas/ruta-ejemplo/ruta-ejemplo.component';
import {FormContainerModule} from './componentes/forms/form-container/form-container.module';
import {PerfilUsuarioTablaModule} from './modulos/perfil-usuario/componentes/perfil-usuario-tabla/perfil-usuario-tabla.module';
import {LoginComponent} from './rutas/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';

import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ArticuloModule} from "./modulos/articulo/articulo.module";
import {HistoricoPlanContratoModule} from './modulos/historico-plan-contrato/historico-plan-contrato.module';

// Formly
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {AutocompleteFormlyComponent} from './modulos/contrato/componentes/autocomplete-formly/autocomplete-formly.component';
import {InputTextModule} from "primeng/inputtext";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    RutaEjemploComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastModule,
    CreateUpdateModalModule,
    HttpClientModule,
    BlockUIModule,
    ConfirmDialogModule,
    MatSidenavModule,
    FormContainerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    PerfilUsuarioTablaModule,
    BreadcrumbModule,
    ArticuloModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'autocomplete',
          component: AutocompleteFormlyComponent,
          wrappers: ['form-field']

        }
      ]
    }),
    InputTextModule,
    FormsModule,
    MatButtonModule,
  ],

  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
