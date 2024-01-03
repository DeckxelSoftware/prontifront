import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutorLibroTablaComponent} from './autor-libro-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {AutorLibroPerfilModule} from '../autor-libro-perfil/autor-libro-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    AutorLibroTablaComponent
  ],
  exports: [
    AutorLibroTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    AutorLibroPerfilModule,
    FormContainerModule,
    RippleModule
  ],
})
export class AutorLibroTablaModule {
}
