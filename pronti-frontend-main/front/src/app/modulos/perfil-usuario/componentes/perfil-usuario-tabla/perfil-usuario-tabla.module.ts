import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerfilUsuarioTablaComponent} from './perfil-usuario-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PerfilUsuarioPerfilModule} from '../perfil-usuario-perfil/perfil-usuario-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {HttpUsuarioService} from '../../../usuario/servicios/http-usuario-service';
import {HttpUsuarioModule} from '../../../usuario/servicios/http-usuario-module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    PerfilUsuarioTablaComponent
  ],
  exports: [
    PerfilUsuarioTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        PerfilUsuarioPerfilModule,
        FormContainerModule,
        HttpUsuarioModule,
        PipesModule,
    ],
})
export class PerfilUsuarioTablaModule {
}
