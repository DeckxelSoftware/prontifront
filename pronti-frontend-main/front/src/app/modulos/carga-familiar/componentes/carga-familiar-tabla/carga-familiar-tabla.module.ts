import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CargaFamiliarTablaComponent} from './carga-familiar-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {CargaFamiliarPerfilModule} from '../carga-familiar-perfil/carga-familiar-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    CargaFamiliarTablaComponent
  ],
  exports: [
    CargaFamiliarTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        CargaFamiliarPerfilModule,
        FormContainerModule,
        PipesModule
    ],
})
export class CargaFamiliarTablaModule {
}
