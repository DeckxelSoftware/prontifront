import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-caracteristicas-anuales-menu',
  templateUrl: './caracteristicas-anuales-menu.component.html',
  styleUrls: ['./caracteristicas-anuales-menu.component.scss']
})
export class CaracteristicasAnualesMenuComponent {

  constructor(private router: Router) {
  }


  navegar(path: string[]) {
    this.router.navigate(['caracteristicas-anuales', ...path])
  }

}
