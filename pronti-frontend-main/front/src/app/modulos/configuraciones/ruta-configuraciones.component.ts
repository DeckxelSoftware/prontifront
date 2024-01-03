import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ruta-configuraciones',
  templateUrl: './ruta-configuraciones.component.html',
  styleUrls: ['./ruta-configuraciones.component.scss']
})
export class RutaConfiguracionesComponent {

  constructor(private _router: Router) {
  }

  irAGestion(rutaGestion: string){
    this._router.navigate(['configuraciones',rutaGestion]);
  }
}
