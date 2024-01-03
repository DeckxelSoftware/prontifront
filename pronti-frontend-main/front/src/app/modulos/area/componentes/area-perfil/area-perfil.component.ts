import {Component, Input} from '@angular/core';
import {AreaResponseDto} from '../../servicios/dto/area.response-dto';
import {AREA_TABS_ARRAY} from './constantes/area-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-area-perfil',
  templateUrl: './area-perfil.component.html',
  styleUrls: ['./area-perfil.component.scss']
})
export class AreaPerfilComponent {
  @Input()
  registro: AreaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = AREA_TABS_ARRAY();

  constructor() {
  }

}
