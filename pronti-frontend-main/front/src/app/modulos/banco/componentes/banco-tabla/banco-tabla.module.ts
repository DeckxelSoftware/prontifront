import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BancoTablaComponent} from './banco-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {BancoPerfilModule} from '../banco-perfil/banco-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    BancoTablaComponent
  ],
  exports: [
    BancoTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        BancoPerfilModule,
        FormContainerModule,
        RippleModule
    ],
})
export class BancoTablaModule {
}
