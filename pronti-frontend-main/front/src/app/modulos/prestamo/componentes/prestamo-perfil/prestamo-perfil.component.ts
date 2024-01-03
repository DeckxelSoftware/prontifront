import {Component, Input} from '@angular/core';
import {PrestamoResponseDto} from '../../servicios/dto/prestamo.response-dto';
import {PRESTAMO_TABS_ARRAY} from './constantes/prestamo-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-prestamo-perfil',
  templateUrl: './prestamo-perfil.component.html',
  styleUrls: ['./prestamo-perfil.component.scss']
})
export class PrestamoPerfilComponent {
  @Input()
  registro: PrestamoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PRESTAMO_TABS_ARRAY();

  constructor() {
  }

}
