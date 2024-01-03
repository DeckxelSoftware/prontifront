import {Component, Input} from '@angular/core';
import {CobroResponseDto} from '../../servicios/dto/cobro.response-dto';
import {COBRO_TABS_ARRAY} from './constantes/cobro-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-cobro-perfil',
  templateUrl: './cobro-perfil.component.html',
  styleUrls: ['./cobro-perfil.component.scss']
})
export class CobroPerfilComponent {
  @Input()
  registro: CobroResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = COBRO_TABS_ARRAY();

  constructor() {
  }

}
