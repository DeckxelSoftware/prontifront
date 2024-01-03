import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuotaTablaComponent} from './cuota-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {CuotaPerfilModule} from '../cuota-perfil/cuota-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    CuotaTablaComponent
  ],
  exports: [
    CuotaTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        CuotaPerfilModule,
        FormContainerModule,
        RippleModule,
        PipesModule
    ],
})
export class CuotaTablaModule {
}
