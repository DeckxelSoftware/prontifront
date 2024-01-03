import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-libro-biblioteca',
  templateUrl: './ruta-libro-biblioteca.component.html',
  styleUrls: ['./ruta-libro-biblioteca.component.scss']
})
export class RutaLibroBibliotecaComponent implements OnInit{

  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {

  }


  ngOnInit(): void {
    this.items = [
      {label:'Libros'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }



}
