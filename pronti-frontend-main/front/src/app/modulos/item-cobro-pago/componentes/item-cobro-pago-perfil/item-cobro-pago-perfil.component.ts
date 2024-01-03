import {Component, Input} from '@angular/core';
import {ItemCobroPagoResponseDto} from '../../servicios/dto/item-cobro-pago.response-dto';
import {ITEM_COBRO_PAGO_TABS_ARRAY} from './constantes/item-cobro-pago-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-item-cobro-pago-perfil',
  templateUrl: './item-cobro-pago-perfil.component.html',
  styleUrls: ['./item-cobro-pago-perfil.component.scss']
})
export class ItemCobroPagoPerfilComponent {
  @Input()
  registro: ItemCobroPagoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ITEM_COBRO_PAGO_TABS_ARRAY();

  constructor() {
  }

}
