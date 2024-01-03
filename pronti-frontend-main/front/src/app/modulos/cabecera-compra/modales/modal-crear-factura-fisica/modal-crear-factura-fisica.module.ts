import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCrearFacturaFisicaComponent} from './modal-crear-factura-fisica.component';
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
import {HttpProveedorModule} from "../../../proveedor/servicios/http-proveedor-module";
import {HttpEmpresaModule} from "../../../empresa/servicios/http-empresa-module";
import {AccordionModule} from "primeng/accordion";
import {FileUploadModule} from "primeng/fileupload";
import {HttpArchivoModule} from "../../../archivo/servicios/http-archivo-module";


@NgModule({
  declarations: [
    ModalCrearFacturaFisicaComponent
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
    HttpProveedorModule,
    HttpEmpresaModule,
    AccordionModule,
    FileUploadModule,
    HttpArchivoModule,
  ],
  exports: [
    ModalCrearFacturaFisicaComponent
  ]
})
export class ModalCrearFacturaFisicaModule {
}
