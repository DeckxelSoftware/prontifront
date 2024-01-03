import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-cargo',
  templateUrl: './ruta-cargo.component.html',
  styleUrls: ['./ruta-cargo.component.scss']
})
export class RutaCargoComponent {
 items: MenuItem[] = [];
  home!: MenuItem;
  constructor() {
   this.items = [
         {label: 'Configuraciones', routerLink: '/configuraciones'},
         {label: 'Cargo'},
       ];
       // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
