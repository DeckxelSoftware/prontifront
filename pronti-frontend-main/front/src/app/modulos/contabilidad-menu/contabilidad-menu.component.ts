import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-contabilidad-menu',
  templateUrl: './contabilidad-menu.component.html',
  styleUrls: ['./contabilidad-menu.component.scss']
})
export class ContabilidadMenuComponent implements OnInit {
  items: MenuItem[]= [];

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.items = [
      {label: 'Asamblea', icon: 'pi pi-angle-right', command: ()=>{
          console.log('mire vea');
          this.router.navigate(['contabilidad','contrato-modulo','reporte-asamblea']);
      }},
      {label: 'Open', icon: 'pi pi-fw pi-download'},
      {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
  ];
    
  }

  navegar(path: string[]) {
    this.router.navigate(['contabilidad', ...path])
  }

  navegarAsientoContable(path: string,) {
    this.router.navigate(['contabilidad', path, 'gestion-asiento-contable-contabilidad'])

  }

}
