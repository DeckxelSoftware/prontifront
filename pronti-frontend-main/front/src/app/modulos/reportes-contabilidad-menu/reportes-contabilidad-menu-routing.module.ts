import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportesContabilidadMenuComponent} from "./reportes-contabilidad-menu.component";
import {RutaInformeClienteComponent} from "../contrato/rutas/ruta-informe-cliente/ruta-informe-cliente.component";

const routes: Routes = [
  {
    path: 'contrato-modulo',
    loadChildren: () => import('../../modulos/contrato/contrato.module')
      .then(m => m.ContratoModule)
  },
  {
    path: 'trabajador-modulo',
    loadChildren: () => import('../../modulos/trabajador/trabajador.module')
      .then(m => m.TrabajadorModule)
  },
  {
    path: '',
    component: ReportesContabilidadMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesContabilidadMenuRoutingModule {
}
