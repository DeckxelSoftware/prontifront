import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bienes-menu',
  templateUrl: './bienes-menu.component.html',
  styleUrls: ['./bienes-menu.component.scss']
})
export class BienesMenuComponent {

  constructor(private _router: Router) {
  }

  irAGestion(ruta: string) {
    this._router.navigate(['bienes',ruta]);
  }
}
