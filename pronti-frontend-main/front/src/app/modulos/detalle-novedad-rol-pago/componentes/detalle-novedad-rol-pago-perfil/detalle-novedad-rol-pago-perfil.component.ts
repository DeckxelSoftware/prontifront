import {Component, Input} from '@angular/core';
import {DetalleNovedadRolPagoResponseDto} from '../../servicios/dto/detalle-novedad-rol-pago.response-dto';
import {DETALLE_NOVEDAD_ROL_PAGO_TABS_ARRAY} from './constantes/detalle-novedad-rol-pago-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-detalle-novedad-rol-pago-perfil',
  templateUrl: './detalle-novedad-rol-pago-perfil.component.html',
  styleUrls: ['./detalle-novedad-rol-pago-perfil.component.scss']
})
export class DetalleNovedadRolPagoPerfilComponent {
  @Input()
  registro: DetalleNovedadRolPagoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = DETALLE_NOVEDAD_ROL_PAGO_TABS_ARRAY();

  constructor() {
  }

}
