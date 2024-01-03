import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-detalle-novedad-rol-pago-trabajador',
  templateUrl: './ruta-detalle-novedad-rol-pago-trabajador.component.html',
  styleUrls: ['./ruta-detalle-novedad-rol-pago-trabajador.component.scss']
})
export class RutaDetalleNovedadRolPagoTrabajadorComponent implements OnInit {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Novedades menú', routerLink: '/novedades-menu'},
      {label: 'Novedades por trabajador'}
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
