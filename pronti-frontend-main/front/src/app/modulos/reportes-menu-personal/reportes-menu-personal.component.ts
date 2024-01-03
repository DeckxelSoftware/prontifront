import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reportes-menu-personal',
  templateUrl: './reportes-menu-personal.component.html',
  styleUrls: ['./reportes-menu-personal.component.scss']
})
export class ReportesMenuPersonalComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(private _router: Router) { }
  ngOnInit(): void {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Reportes'},
    ];
  }



  navegar(rutas: string[]) {
    this._router.navigate(['personal', 'reportes-personal', ...rutas])
  }

  

}
