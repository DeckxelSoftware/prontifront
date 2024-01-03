import {Component, Input, OnInit} from '@angular/core';
import {AutorLibroResponseDto} from '../../servicios/dto/autor-libro.response-dto';
import {AUTOR_LIBRO_TABS_ARRAY} from './constantes/autor-libro-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-autor-libro-perfil',
  templateUrl: './autor-libro-perfil.component.html',
  styleUrls: ['./autor-libro-perfil.component.scss']
})
export class AutorLibroPerfilComponent implements OnInit{
  @Input()
  registro: AutorLibroResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = AUTOR_LIBRO_TABS_ARRAY();

  constructor() {
  }

  ngOnInit(): void {

    console.log('regis', this.registro);
  }




}
