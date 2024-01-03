import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-proveedores-menu',
  templateUrl: './proveedores-menu.component.html',
  styleUrls: ['./proveedores-menu.component.scss']
})
export class ProveedoresMenuComponent {

  constructor(
    public router: Router,
  ) {
  }

  navegar(path: string) {
    this.router.navigate(['proveedores', path])
  }

}
