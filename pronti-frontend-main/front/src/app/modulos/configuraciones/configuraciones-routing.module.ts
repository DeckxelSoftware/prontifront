import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaConfiguracionesComponent} from './ruta-configuraciones.component';
import {LoginCanActivateChildRoutes} from '../../guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: RutaConfiguracionesComponent
  },
  {
    path: 'rol-modulo',
    loadChildren: () => import('../rol/rol.module')
      .then(m => m.RolModule)
  },

  {
    path: 'permiso-modulo',
    loadChildren: () => import('../permiso/permiso.module')
      .then(m => m.PermisoModule)
  },
  {
    path: 'usuario-modulo',
    loadChildren: () => import('../usuario/usuario.module')
      .then(m => m.UsuarioModule)
  },
  {
    path: 'empresa-modulo',
    loadChildren: () => import('../empresa/empresa.module')
      .then(m => m.EmpresaModule)
  },
  {
    path: 'banco-modulo',
    loadChildren: () => import('../banco/banco.module')
      .then(m => m.BancoModule)
  },
  {
    path: 'modulo-lista-valores-detalle',
    loadChildren: () => import('../lista-valores-detalle/lista-valores-detalle.module')
      .then(m => m.ListaValoresDetalleModule)
  },
  {
    path: 'cuenta-banco-empresa-modulo',
    loadChildren: () => import('../cuenta-bancaria-empresa/cuenta-bancaria-empresa.module')
      .then(m => m.CuentaBancariaEmpresaModule)
  },
  {
    path: 'configuracion-general-modulo',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('../configuracion-general/configuracion-general.module')
      .then(m => m.ConfiguracionGeneralModule)
  },
  {
    path: 'cargo-modulo',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('../cargo/cargo.module')
      .then(m => m.CargoModule)
  },
  {
    path: 'impuesto-renta-modulo',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('../impuesto-renta/impuesto-renta.module')
      .then(m => m.ImpuestoRentaModule)
  },
  {
    path: 'region-modulo',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('../region/region.module')
      .then(m => m.RegionModule)
  },
  {
    path: 'recursos-modulo',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('../recurso/recurso.module')
      .then(m => m.RecursoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule {
}
