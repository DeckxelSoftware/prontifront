import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistroVacacionTablaComponent} from './registro-vacacion-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RegistroVacacionPerfilModule} from '../registro-vacacion-perfil/registro-vacacion-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    RegistroVacacionTablaComponent
  ],
  exports: [
    RegistroVacacionTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        RegistroVacacionPerfilModule,
        FormContainerModule,
        RippleModule
    ],
})
export class RegistroVacacionTablaModule {
}
