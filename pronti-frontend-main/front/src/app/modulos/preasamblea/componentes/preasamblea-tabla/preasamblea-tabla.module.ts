import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreasambleaTablaComponent} from './preasamblea-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PreasambleaPerfilModule} from '../preasamblea-perfil/preasamblea-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {ModalAprobarPreasambleaModule} from "../modal-aprobar-preasamblea/modal-aprobar-preasamblea.module";


@NgModule({
  declarations: [
    PreasambleaTablaComponent
  ],
  exports: [
    PreasambleaTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    PreasambleaPerfilModule,
    FormContainerModule,
    ModalAprobarPreasambleaModule,
  ],
})
export class PreasambleaTablaModule {
}
