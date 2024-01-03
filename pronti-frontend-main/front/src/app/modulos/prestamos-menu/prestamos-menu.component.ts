import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-prestamos-menu',
  templateUrl: './prestamos-menu.component.html',
  styleUrls: ['./prestamos-menu.component.scss']
})
export class PrestamosMenuComponent {

  constructor(private _router: Router) {
  }


  navegar(path: string) {
    this._router.navigate(['prestamo','prestamo-modulo', path])
  }
}
