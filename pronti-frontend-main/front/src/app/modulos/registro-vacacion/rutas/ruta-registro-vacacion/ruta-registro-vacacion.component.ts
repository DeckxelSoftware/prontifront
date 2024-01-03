import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-registro-vacacion',
  templateUrl: './ruta-registro-vacacion.component.html',
  styleUrls: ['./ruta-registro-vacacion.component.scss']
})
export class RutaRegistroVacacionComponent implements OnInit{


  items: MenuItem[] = [];

  idCargoVacacion = 0;
  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    console.log('migas', this._activatedRoute.snapshot.params);
    const {idTrabajador,idCargoVacacion}  = this._activatedRoute.snapshot.params;
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Trabajadores', routerLink: '/personal/trabajadores-modulo'},
      {label: 'Vacaciones', routerLink: `/personal/trabajadores-modulo/${idTrabajador}/cargo-vacacion-modulo`},
      {label: 'Registro vacación'},
    ];
   this.idCargoVacacion = idCargoVacacion;
  }

}
