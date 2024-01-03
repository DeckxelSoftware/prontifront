import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbonoPrestamoTablaComponent} from './abono-prestamo-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {AbonoPrestamoPerfilModule} from '../abono-prestamo-perfil/abono-prestamo-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    AbonoPrestamoTablaComponent
  ],
  exports: [
    AbonoPrestamoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    AbonoPrestamoPerfilModule,
    FormContainerModule,
    PipesModule
  ],
})
export class AbonoPrestamoTablaModule {
}
