import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaArchivoComponent} from './rutas/ruta-archivo/ruta-archivo.component';

const routes: Routes = [
  {
    component: RutaArchivoComponent,
    path: ':entidad/:idEntidad/:tipoDocumento/archivo'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivoRoutingModule {
}
