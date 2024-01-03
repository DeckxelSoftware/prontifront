import {Component, Input} from '@angular/core';
import {RegionResponseDto} from '../../servicios/dto/region.response-dto';
import {REGION_TABS_ARRAY} from './constantes/region-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-region-perfil',
  templateUrl: './region-perfil.component.html',
  styleUrls: ['./region-perfil.component.scss']
})
export class RegionPerfilComponent {
  @Input()
  registro: RegionResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = REGION_TABS_ARRAY();

  constructor() {
  }

}
