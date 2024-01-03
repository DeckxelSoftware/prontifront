import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaAutorLibroComponent} from './rutas/ruta-autor-libro/ruta-autor-libro.component';

const routes: Routes = [
  {
    component: RutaAutorLibroComponent,
    path: 'autor-libro'
  },
  {
    path: '',
    redirectTo: 'autor-libro',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorLibroRoutingModule {
}
