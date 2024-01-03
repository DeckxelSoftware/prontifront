import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DivisionAdministrativaTablaComponent} from './division-administrativa-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {DivisionAdministrativaPerfilModule} from '../division-administrativa-perfil/division-administrativa-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    DivisionAdministrativaTablaComponent
  ],
  exports: [
    DivisionAdministrativaTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    DivisionAdministrativaPerfilModule,
    FormContainerModule
  ],
})
export class DivisionAdministrativaTablaModule {
}
