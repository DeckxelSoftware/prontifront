import {Component} from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-rubros-rol',
  templateUrl: './ruta-rubros-rol.component.html',
  styleUrls: ['./ruta-rubros-rol.component.scss']
})
export class RutaRubrosRolComponent {
 items: MenuItem[] = [];
  home!: MenuItem;
  constructor() {
     this.items = [
           {label: 'Personal menú', routerLink: '/personal'},
           {label: 'Rubros rol'},
         ];
         this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
