import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ruta-revision',
  templateUrl: './ruta-revision.component.html',
  styleUrls: ['./ruta-revision.component.scss']
})
export class RutaRevisionComponent implements OnInit{ 


  items: MenuItem[] = [];
  idArticulo = 0;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.items = [
      {label:'Bienes', routerLink: '/bienes'},
      {label:'Artículo', routerLink: '/bienes/articulo-modulo'},
      {label:'Revisiones'},
    ];
  }
  
  ngOnInit(): void {
    
    const  { idArticulo}= this._activatedRoute.snapshot.params;
    this.idArticulo = idArticulo;

  }

}
