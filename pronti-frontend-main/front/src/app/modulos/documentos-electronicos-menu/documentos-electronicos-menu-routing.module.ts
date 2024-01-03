import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentosElectronicosMenuComponent} from './documentos-electronicos-menu.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentosElectronicosMenuComponent
  },
  {
    path: 'factura-modulo',
    loadChildren: () => import('../factura/factura.module')
      .then(m => m.FacturaModule)
  },
  {
    path: 'nota-credito-modulo',
    loadChildren: () => import('../nota-credito/nota-credito.module')
      .then(m => m.NotaCreditoModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentosElectronicosMenuRoutingModule {
}
