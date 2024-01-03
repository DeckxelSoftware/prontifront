import {Component, Input} from '@angular/core';
import {LibroBibliotecaResponseDto} from '../../servicios/dto/libro-biblioteca.response-dto';
import {LIBRO_BIBLIOTECA_TABS_ARRAY} from './constants/libro-biblioteca-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-libro-biblioteca-perfil',
  templateUrl: './libro-biblioteca-perfil.component.html',
  styleUrls: ['./libro-biblioteca-perfil.component.scss']
})
export class LibroBibliotecaPerfilComponent {
  @Input()
  registro: LibroBibliotecaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = LIBRO_BIBLIOTECA_TABS_ARRAY();

  constructor() {
  }

}
