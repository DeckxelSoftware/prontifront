import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InformacionFinancieraTablaComponent} from './informacion-financiera-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {InformacionFinancieraPerfilModule} from '../informacion-financiera-perfil/informacion-financiera-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {HttpBancoModule} from "../../../banco/servicios/http-banco-module";
import {
  HttpListaValoresDetalleModule
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-module";


@NgModule({
  declarations: [
    InformacionFinancieraTablaComponent
  ],
  exports: [
    InformacionFinancieraTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    InformacionFinancieraPerfilModule,
    FormContainerModule,
    PipesModule,
    HttpListaValoresDetalleModule,
    HttpBancoModule,
  ],
})
export class InformacionFinancieraTablaModule {
}
