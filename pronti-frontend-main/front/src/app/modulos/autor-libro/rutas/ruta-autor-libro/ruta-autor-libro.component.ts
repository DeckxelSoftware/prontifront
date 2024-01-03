import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-autor-libro',
  templateUrl: './ruta-autor-libro.component.html',
  styleUrls: ['./ruta-autor-libro.component.scss']
})
export class RutaAutorLibroComponent implements OnInit {

  idLibro!: number;

  items: MenuItem[] = [];
  home!: MenuItem;
  constructor(private _activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this._activatedRouter.snapshot.params);
    const {idLibro} = this._activatedRouter.snapshot.params;
    this.idLibro = idLibro;


    this.items = [
      {label:'Libros', routerLink: '/libro-module'},
      {label:'Autores'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

  }

}
