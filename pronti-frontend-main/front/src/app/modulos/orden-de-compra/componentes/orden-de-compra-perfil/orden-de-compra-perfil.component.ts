import {Component, Input} from '@angular/core';
import {OrdenDeCompraResponseDto} from '../../servicios/dto/orden-de-compra.response-dto';
import {ORDEN_DE_COMPRA_TABS_ARRAY} from './constantes/orden-de-compra-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-orden-de-compra-perfil',
  templateUrl: './orden-de-compra-perfil.component.html',
  styleUrls: ['./orden-de-compra-perfil.component.scss']
})
export class OrdenDeCompraPerfilComponent {
  @Input()
  registro: OrdenDeCompraResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ORDEN_DE_COMPRA_TABS_ARRAY();

  constructor() {
  }

}
