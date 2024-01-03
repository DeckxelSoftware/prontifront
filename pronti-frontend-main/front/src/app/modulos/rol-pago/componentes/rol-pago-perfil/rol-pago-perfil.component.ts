import {Component, Input} from '@angular/core';
import {RolPagoResponseDto} from '../../servicios/dto/rol-pago.response-dto';
import {ROL_PAGO_TABS_ARRAY} from './constantes/rol-pago-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-rol-pago-perfil',
  templateUrl: './rol-pago-perfil.component.html',
  styleUrls: ['./rol-pago-perfil.component.scss']
})
export class RolPagoPerfilComponent {
  @Input()
  registro: RolPagoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ROL_PAGO_TABS_ARRAY();

  constructor() {
  }

}
