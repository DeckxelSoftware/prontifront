import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuentaBancariaEmpresaTablaComponent} from './cuenta-bancaria-empresa-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {CuentaBancariaEmpresaPerfilModule} from '../cuenta-bancaria-empresa-perfil/cuenta-bancaria-empresa-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {ListaValoresDetalleModule} from '../../../lista-valores-detalle/lista-valores-detalle.module';
import {EmpresaModule} from '../../../empresa/empresa.module';
import {HttpListaValoresDetalleModule} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-module';
import {HttpEmpresaModule} from '../../../empresa/servicios/http-empresa-module';
import {HttpBancoModule} from '../../../banco/servicios/http-banco-module';


@NgModule({
  declarations: [
    CuentaBancariaEmpresaTablaComponent
  ],
  exports: [
    CuentaBancariaEmpresaTablaComponent,
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ButtonModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        CuentaBancariaEmpresaPerfilModule,
        FormContainerModule,
        RippleModule,
        HttpListaValoresDetalleModule,
        HttpEmpresaModule,
        HttpBancoModule,

    ],
})
export class CuentaBancariaEmpresaTablaModule {
}
