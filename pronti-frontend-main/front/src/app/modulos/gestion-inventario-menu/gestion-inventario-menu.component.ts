import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gestion-inventario-menu',
  templateUrl: './gestion-inventario-menu.component.html',
  styleUrls: ['./gestion-inventario-menu.component.scss']
})
export class GestionInventarioMenuComponent {

  constructor(private _router: Router) {
  }


  irGestionClienteGrupo() {

    this._router.navigate(['inventarios', 'cliente-en-grupo-modulo'])
  }
}
