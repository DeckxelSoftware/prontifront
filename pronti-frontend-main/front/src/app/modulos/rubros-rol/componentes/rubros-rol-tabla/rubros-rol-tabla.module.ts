import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RubrosRolTablaComponent} from './rubros-rol-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RubrosRolPerfilModule} from '../rubros-rol-perfil/rubros-rol-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    RubrosRolTablaComponent
  ],
  exports: [
    RubrosRolTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RubrosRolPerfilModule,
    FormContainerModule,
    PipesModule,
    MatCardModule
  ],
})
export class RubrosRolTablaModule {
}
