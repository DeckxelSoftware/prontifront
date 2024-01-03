import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClienteEnGrupoTablaComponent} from './cliente-en-grupo-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ClienteEnGrupoPerfilModule} from '../cliente-en-grupo-perfil/cliente-en-grupo-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {HttpGrupoModule} from '../../../grupo/servicios/http-grupo-module';
import {HttpClienteModule} from '../../../cliente/servicios/http-cliente-module';


@NgModule({
  declarations: [
    ClienteEnGrupoTablaComponent
  ],
  exports: [
    ClienteEnGrupoTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        ClienteEnGrupoPerfilModule,
        FormContainerModule,
        RippleModule,
        HttpGrupoModule,
        HttpClienteModule,
    ],
})
export class ClienteEnGrupoTablaModule {
}
