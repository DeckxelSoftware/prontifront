import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-rol-pago-individual',
  templateUrl: './ruta-rol-pago-individual.component.html',
  styleUrls: ['./ruta-rol-pago-individual.component.scss']
})
export class RutaRolPagoIndividualComponent implements OnInit {
  items: MenuItem[] = [];
  home!: MenuItem;


  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Rol pago individual'},
    ];
  }

}
