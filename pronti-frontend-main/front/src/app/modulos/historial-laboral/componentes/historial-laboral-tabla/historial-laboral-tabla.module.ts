import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistorialLaboralTablaComponent} from './historial-laboral-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {HistorialLaboralPerfilModule} from '../historial-laboral-perfil/historial-laboral-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    HistorialLaboralTablaComponent
  ],
  exports: [
    HistorialLaboralTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        HistorialLaboralPerfilModule,
        FormContainerModule,
        PipesModule
    ],
})
export class HistorialLaboralTablaModule {
}
