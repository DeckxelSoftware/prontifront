import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reportes-contabilidad-menu',
  templateUrl: './reportes-contabilidad-menu.component.html',
  styleUrls: ['./reportes-contabilidad-menu.component.scss']
})
export class ReportesContabilidadMenuComponent {

  items: MenuItem[] = [];

  constructor(
    public router: Router,
  ) {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Reportes menú'},
    ];
  }

  navegar(path: string[]) {
    this.router.navigate(['contabilidad', 'reportes-contabilidad-menu', ...path])
  }
}
