import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClienteTablaComponent} from './cliente-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ClientePerfilModule} from '../cliente-perfil/cliente-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {SharedComponentesModule} from '../../../../shared/shared-componentes.module';
import {RippleModule} from 'primeng/ripple';
import {EmpresaModule} from '../../../empresa/empresa.module';
import {UsuarioModule} from '../../../usuario/usuario.module';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenuModule} from 'primeng/menu';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    ClienteTablaComponent
  ],
  exports: [
    ClienteTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ClientePerfilModule,
    FormContainerModule,
    SharedComponentesModule,
    RippleModule,
    EmpresaModule,
    UsuarioModule,
    SplitButtonModule,
    MenuModule,
    PipesModule

  ],
})
export class ClienteTablaModule {
}
