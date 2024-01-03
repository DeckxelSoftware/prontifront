import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalInfoFacturaComponent} from './modal-info-factura.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {
  HttpListaValoresDetalleModule
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-module";
import {AutoCompleteModule} from "primeng/autocomplete";
import {HttpAgenciaModule} from "../../../agencia/servicios/http-agencia-module";
import {HttpRecursoModule} from "../../../recurso/servicios/http-recurso-module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {TableModule} from "primeng/table";
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    ModalInfoFacturaComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    HttpListaValoresDetalleModule,
    AutoCompleteModule,
    HttpAgenciaModule,
    HttpRecursoModule,
    MatTabsModule,
    MatTableModule,
    TableModule,
    PipesModule,
  ],
  exports: [
    ModalInfoFacturaComponent
  ]
})
export class ModalInfoFacturaModule {
}
