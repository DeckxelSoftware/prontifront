import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfiguracionGeneralTablaComponent} from './configuracion-general-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfiguracionGeneralPerfilModule} from '../configuracion-general-perfil/configuracion-general-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    ConfiguracionGeneralTablaComponent
  ],
  exports: [
    ConfiguracionGeneralTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ConfiguracionGeneralPerfilModule,
    FormContainerModule
  ],
})
export class ConfiguracionGeneralTablaModule {
}
