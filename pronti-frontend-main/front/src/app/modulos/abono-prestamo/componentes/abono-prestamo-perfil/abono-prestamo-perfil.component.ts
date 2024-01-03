import {Component, Input} from '@angular/core';
import {AbonoPrestamoResponseDto} from '../../servicios/dto/abono-prestamo.response-dto';
import {ABONO_PRESTAMO_TABS_ARRAY} from './constantes/abono-prestamo-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-abono-prestamo-perfil',
  templateUrl: './abono-prestamo-perfil.component.html',
  styleUrls: ['./abono-prestamo-perfil.component.scss']
})
export class AbonoPrestamoPerfilComponent {
  @Input()
  registro: AbonoPrestamoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ABONO_PRESTAMO_TABS_ARRAY();

  constructor() {
  }

}
