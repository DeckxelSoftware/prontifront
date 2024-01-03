import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticuloTablaComponent} from './articulo-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ArticuloPerfilModule} from '../articulo-perfil/articulo-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {RippleModule} from 'primeng/ripple';
import {PipesModule} from '../../../../pipes/pipes.module';
import {HttpListaValoresTipoModule} from '../../../../servicios/lista-valores-tipo/http-lista-valores-tipo.module';
import {ListaValoresDetalleModule} from '../../../lista-valores-detalle/lista-valores-detalle.module';


@NgModule({
  declarations: [
    ArticuloTablaComponent
  ],
  exports: [
    ArticuloTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        ArticuloPerfilModule,
        FormContainerModule,
        RippleModule,
        PipesModule,
        HttpListaValoresTipoModule,
        ListaValoresDetalleModule,
    ],
})
export class ArticuloTablaModule {
}
