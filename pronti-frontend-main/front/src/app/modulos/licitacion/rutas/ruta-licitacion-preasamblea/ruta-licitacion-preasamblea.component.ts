import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-licitacion-preasamblea',
  templateUrl: './ruta-licitacion-preasamblea.component.html',
  styleUrls: ['./ruta-licitacion-preasamblea.component.scss']
})
export class RutaLicitacionPreasambleaComponent implements OnInit {


  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Preasamblea' },
    ];
  }


}
