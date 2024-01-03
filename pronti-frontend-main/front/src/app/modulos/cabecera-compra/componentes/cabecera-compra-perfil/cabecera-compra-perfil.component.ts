import {Component, Input} from '@angular/core';
import {CabeceraCompraResponseDto} from '../../servicios/dto/cabecera-compra.response-dto';
import {CABECERA_COMPRA_TABS_ARRAY} from './constantes/cabecera-compra-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-cabecera-compra-perfil',
  templateUrl: './cabecera-compra-perfil.component.html',
  styleUrls: ['./cabecera-compra-perfil.component.scss']
})
export class CabeceraCompraPerfilComponent {
  @Input()
  registro: CabeceraCompraResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CABECERA_COMPRA_TABS_ARRAY();

  constructor() {
  }

}
