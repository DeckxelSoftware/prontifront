import {Component, Input} from '@angular/core';
import {CuentaContableResponseDto} from '../../servicios/dto/cuenta-contable.response-dto';
import {CUENTA_CONTABLE_TABS_ARRAY} from './constantes/cuenta-contable-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cuenta-contable-perfil',
  templateUrl: './cuenta-contable-perfil.component.html',
  styleUrls: ['./cuenta-contable-perfil.component.scss']
})
export class CuentaContablePerfilComponent {
  @Input()
  registro: CuentaContableResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CUENTA_CONTABLE_TABS_ARRAY();

  constructor() {
  }

}
