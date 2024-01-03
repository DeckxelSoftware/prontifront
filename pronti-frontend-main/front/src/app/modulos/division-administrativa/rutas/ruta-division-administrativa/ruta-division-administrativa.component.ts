import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-division-administrativa',
  templateUrl: './ruta-division-administrativa.component.html',
  styleUrls: ['./ruta-division-administrativa.component.scss']
})
export class RutaDivisionAdministrativaComponent {
 items: MenuItem[] = [];
  home!: MenuItem;
  constructor() {
     this.items = [
           {label: 'Personal menú', routerLink: '/personal'},
           {label: 'División administrativa'},
         ];
         this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
