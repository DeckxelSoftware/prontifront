import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pagos2TablaComponent} from './pagos2-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {Pagos2PerfilModule} from '../pagos2-perfil/pagos2-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import { PipesModule } from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    Pagos2TablaComponent
  ],
  exports: [
    Pagos2TablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    Pagos2PerfilModule,
    FormContainerModule,
    PipesModule
  ],
})
export class Pagos2TablaModule {
}
