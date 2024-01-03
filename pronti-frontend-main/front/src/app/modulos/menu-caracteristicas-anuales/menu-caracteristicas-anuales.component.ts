import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-caracteristicas-anuales',
  templateUrl: './menu-caracteristicas-anuales.component.html',
  styleUrls: ['./menu-caracteristicas-anuales.component.scss']
})
export class MenuCaracteristicasAnualesComponent {

  constructor(
    public router: Router,
  ) {
  }


  navegar(path: string[]) {
    this.router.navigate(['caracteristicas-anuales-menu', ...path]);
  }
}
