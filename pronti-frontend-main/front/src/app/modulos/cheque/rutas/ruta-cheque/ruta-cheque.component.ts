import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-cheque',
  templateUrl: './ruta-cheque.component.html',
  styleUrls: ['./ruta-cheque.component.scss']
})
export class RutaChequeComponent implements OnInit{
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Cheque'},
    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
