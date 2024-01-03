import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-subgrupo-contable',
  templateUrl: './ruta-subgrupo-contable.component.html',
  styleUrls: ['./ruta-subgrupo-contable.component.scss']
})
export class RutaSubgrupoContableComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Grupo contable', routerLink: '/contabilidad/grupo-contable-modulo'},
      {label: 'Subgrupo contable'},
    ];
  }

}
