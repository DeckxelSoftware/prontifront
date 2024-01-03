import {Component} from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-memorandum',
  templateUrl: './ruta-memorandum.component.html',
  styleUrls: ['./ruta-memorandum.component.scss']
})
export class RutaMemorandumComponent {
 items: MenuItem[] = [];
  home!: MenuItem;
  constructor() {
   this.items = [
         {label: 'Personal menú', routerLink: '/personal'},
         {label: 'Trabajadores', routerLink: '/personal/trabajadores-modulo'},
         {label: 'Memorandum'},
       ];
       this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
