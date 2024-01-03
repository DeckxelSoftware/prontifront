import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-novedades-menu',
  templateUrl: './novedades-menu.component.html',
  styleUrls: ['./novedades-menu.component.scss']
})
export class NovedadesMenuComponent {

  constructor(
    public router: Router,
  ) {
  }


  navegar(path: string) {
    this.router.navigate(['novedades-menu','detalle-novedad-rol-pago-modulo', path]);
  }
}
