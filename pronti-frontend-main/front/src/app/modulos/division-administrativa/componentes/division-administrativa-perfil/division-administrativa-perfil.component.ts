import {Component, Input} from '@angular/core';
import {DivisionAdministrativaResponseDto} from '../../servicios/dto/division-administrativa.response-dto';
import {DIVISION_ADMINISTRATIVA_TABS_ARRAY} from './constantes/division-administrativa-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-division-administrativa-perfil',
  templateUrl: './division-administrativa-perfil.component.html',
  styleUrls: ['./division-administrativa-perfil.component.scss']
})
export class DivisionAdministrativaPerfilComponent {
  @Input()
  registro: DivisionAdministrativaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = DIVISION_ADMINISTRATIVA_TABS_ARRAY();

  constructor() {
  }

}
