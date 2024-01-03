import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-preasamblea',
  templateUrl: './ruta-preasamblea.component.html',
  styleUrls: ['./ruta-preasamblea.component.scss']
})
export class RutaPreasambleaComponent {

  items: MenuItem[] = [];
  constructor() {
    this.items = [
      {label: 'Gestión de Asamblea',},
    ];
  }

}
