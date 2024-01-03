import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaEjemploComponent} from './rutas/ruta-ejemplo/ruta-ejemplo.component';
import {LoginComponent} from './rutas/login/login.component';
import {LoginCanActivateChildRoutes} from './guards/login-guard.guard';
import {
  RutaHistoricoPlanContratoComponent
} from './modulos/historico-plan-contrato/rutas/ruta-historico-plan-contrato/ruta-historico-plan-contrato.component';

const routes: Routes = [


  {
    path: 'ejemplo',
    component: RutaEjemploComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'libro-module',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/libro-biblioteca/libro-biblioteca.module')
      .then(m => m.LibroBibliotecaModule)
  },
  // {
  //   path: 'configuracion-module',
  //   loadChildren: () => import('./modulos/usuario/usuario.module')
  //     .then(m => m.UsuarioModule)
  // },
  {
    path: 'configuraciones',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/configuraciones/configuraciones.module')
      .then(m => m.ConfiguracionesModule)
  },
  {
    path: 'personal',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/personal/personal.module')
      .then(m => m.PersonalModule)
  },
  {
    path: 'modulo-archivos',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/archivo/archivo.module')
      .then(m => m.ArchivoModule)
  },
  {
    path: 'bienes',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/bienes/bienes.module')
      .then(m => m.BienesModule)
  },
  {
    path: 'contratos',
    loadChildren: () => import('./modulos/contratos-menu/contratos-menu.module')
      .then(m => m.ContratosMenuModule)
  },
  {
    path: 'proveedores',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/proveedores-menu/proveedores-menu.module')
      .then(m => m.ProveedoresMenuModule)
  },
  {
    path: 'inventarios',
    loadChildren: () => import('./modulos/gestion-inventario-menu/gestion-inventario-menu.module')
      .then(m => m.GestionInventarioMenuModule)
  },
  {
    path: 'contabilidad',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/contabilidad-menu/contabilidad-menu.module')
      .then(m => m.ContabilidadMenuModule)
  },
  {
    path: 'documentos-electronicos',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/documentos-electronicos-menu/documentos-electronicos-menu.module')
      .then(m => m.DocumentosElectronicosMenuModule)
  },
  {
    path: 'licitacion-modulo',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/licitacion/licitacion.module')
      .then(m => m.LicitacionModule)
  },
  {
    path: 'prestamo',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/prestamos-menu/prestamos-menu.module')
      .then(m => m.PrestamosMenuModule)
  },
  {
    path: 'novedades-menu',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/novedades-menu/novedades-menu.module')
      .then(m => m.NovedadesMenuModule)
  },
  {
    path: 'caracteristicas-anuales-menu',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/menu-caracteristicas-anuales/menu-caracteristicas-anuales.module')
      .then(m => m.MenuCaracteristicasAnualesModule)
  },
  {
    path: 'preasamblea',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/preasamblea/preasamblea.module')
      .then(m => m.PreasambleaModule)
  },

  {
    path: 'caracteristicas-anuales',
    canActivateChild: [LoginCanActivateChildRoutes],
    loadChildren: () => import('./modulos/caracteristicas-anuales-menu/caracteristicas-anuales-menu.module')
      .then(m => m.CaracteristicasAnualesMenuModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
