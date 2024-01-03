import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaLibroBibliotecaComponent} from './rutas/ruta-libro-biblioteca/ruta-libro-biblioteca.component';

const routes: Routes = [
  {
    component: RutaLibroBibliotecaComponent,
    path: 'libro'
  },
  {
    path: '',
    redirectTo: 'libro',
  },
  {
    path: ':idLibro/autor-libro-module',
    loadChildren: () => import('./../autor-libro/autor-libro.module')
      .then(m => m.AutorLibroModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibroBibliotecaRoutingModule {
}
