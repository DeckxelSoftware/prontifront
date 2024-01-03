import {Component} from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-abono-prestamo',
  templateUrl: './ruta-abono-prestamo.component.html',
  styleUrls: ['./ruta-abono-prestamo.component.scss']
})
export class RutaAbonoPrestamoComponent {

   items: MenuItem[] = [];
    home!: MenuItem;

  constructor() {
     this.items = [
           {label: 'Menú préstamos', routerLink: '/prestamo'},
           {label: 'Préstamos', routerLink:'/prestamo/prestamo-modulo'},
           {label: 'Abono'},
         ];
         this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
