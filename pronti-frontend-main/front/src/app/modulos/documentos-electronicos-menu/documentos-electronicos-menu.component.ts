import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-documentos-electronicos-menu',
  templateUrl: './documentos-electronicos-menu.component.html',
  styleUrls: ['./documentos-electronicos-menu.component.scss']
})
export class DocumentosElectronicosMenuComponent {

  constructor(private router: Router) { }


  navegar(path: string) {
    this.router.navigate(['documentos-electronicos', path])
  }
}
