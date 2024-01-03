import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contratos-menu',
  templateUrl: './contratos-menu.component.html',
  styleUrls: ['./contratos-menu.component.scss']
})
export class ContratosMenuComponent {

  constructor(private router: Router) {
  }

  navegar(path: string) {
    this.router.navigate(['contratos', path])
  }

  irGestionContratos() {
    this.router.navigate(['contratos','contrato-modulo']);
  }
}
