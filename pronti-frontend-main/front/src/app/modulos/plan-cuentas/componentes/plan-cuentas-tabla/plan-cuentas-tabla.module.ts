import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanCuentasTablaComponent} from './plan-cuentas-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PlanCuentasPerfilModule} from '../plan-cuentas-perfil/plan-cuentas-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {HttpCuentaContableModule} from "../../../cuenta-contable/servicios/http-cuenta-contable-module";


@NgModule({
  declarations: [
    PlanCuentasTablaComponent
  ],
  exports: [
    PlanCuentasTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    PlanCuentasPerfilModule,
    FormContainerModule,
    HttpCuentaContableModule,
  ],
})
export class PlanCuentasTablaModule {
}
