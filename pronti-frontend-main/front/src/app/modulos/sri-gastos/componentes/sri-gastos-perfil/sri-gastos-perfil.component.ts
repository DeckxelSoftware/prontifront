import {Component, Input} from '@angular/core';
import {SriGastosResponseDto} from '../../servicios/dto/sri-gastos.response-dto';
import {SRI_GASTOS_TABS_ARRAY} from './constantes/sri-gastos-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-sri-gastos-perfil',
  templateUrl: './sri-gastos-perfil.component.html',
  styleUrls: ['./sri-gastos-perfil.component.scss']
})
export class SriGastosPerfilComponent {
  @Input()
  registro: SriGastosResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = SRI_GASTOS_TABS_ARRAY();

  constructor() {
  }

}
