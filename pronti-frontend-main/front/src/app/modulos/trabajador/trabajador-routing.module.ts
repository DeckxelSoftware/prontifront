import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaTrabajadorComponent} from './rutas/ruta-trabajador/ruta-trabajador.component';
import {
  RutaDetalleNovedadRolPagoTrabajadorComponent
} from '../detalle-novedad-rol-pago/rutas/ruta-detalle-novedad-rol-pago-trabajador/ruta-detalle-novedad-rol-pago-trabajador.component';
import {RutaIngresosDescuentosComponent} from './rutas/ruta-ingresos-descuentos/ruta-ingresos-descuentos.component';
import {
  CaracteristicasAnualesTrabajadorComponent
} from "./rutas/caracteristicas-anuales-trabajador/caracteristicas-anuales-trabajador.component";
import {RutaInformeNominaComponent} from "./rutas/ruta-informe-nomina/ruta-informe-nomina.component";

const routes: Routes = [
  {
    component: RutaTrabajadorComponent,
    path: 'gestion-trabajadores'
  },
  {
    path: '',
    redirectTo: 'gestion-trabajadores',
  },
  {
    path: ':idTrabajador/carga-familiar-modulo',
    loadChildren: () => import('../carga-familiar/carga-familiar.module')
      .then(m => m.CargaFamiliarModule)
  },
  {
    path: ':idTrabajador/historial-laboral-modulo',
    loadChildren: () => import('../historial-laboral/historial-laboral.module')
      .then(m => m.HistorialLaboralModule)
  },
  {
    path: ':idTrabajador/cargo-vacacion-modulo',
    loadChildren: () => import('../cargo-vacacion/cargo-vacacion.module')
      .then(m => m.CargoVacacionModule)
  },
  {
    path: ':idTrabajador/informacion-financiera-modulo',
    loadChildren: () => import('../informacion-financiera/informacion-financiera.module')
      .then(m => m.InformacionFinancieraModule)
  },
  {
    path: ':idTrabajador/memorandum-modulo',
    loadChildren: () => import('../memorandum/memorandum.module')
      .then(m => m.MemorandumModule)
  },
  {
    path: ':idTrabajador/sri-gastos-modulo',
    loadChildren: () => import('../sri-gastos/sri-gastos.module')
      .then(m => m.SriGastosModule)
  },
  // {
  //   path: ':idTrabajador/detalle-novedad-rol-pago-trabajador',
  //   component: RutaDetalleNovedadRolPagoTrabajadorComponent
  // },
  {
    path: 'ingresos-descuentos',
    component: RutaIngresosDescuentosComponent
  },
  {
    path: 'caracteristicas-anuales-trabajador/decimo-cuarto',
    component: CaracteristicasAnualesTrabajadorComponent
  },
  {
    path: 'caracteristicas-anuales-trabajador/decimo-tercero',
    component: CaracteristicasAnualesTrabajadorComponent
  },
  {
    path: 'informe-nomina',
    component: RutaInformeNominaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajadorRoutingModule {
}
