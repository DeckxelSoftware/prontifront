import {Component, Input} from '@angular/core';
import {PeriodoLaboralResponseDto} from '../../servicios/dto/periodo-laboral.response-dto';
import {PERIODO_LABORAL_TABS_ARRAY} from './constantes/periodo-laboral-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-periodo-laboral-perfil',
  templateUrl: './periodo-laboral-perfil.component.html',
  styleUrls: ['./periodo-laboral-perfil.component.scss']
})
export class PeriodoLaboralPerfilComponent {
  @Input()
  registro: PeriodoLaboralResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PERIODO_LABORAL_TABS_ARRAY();

  constructor() {
  }

}
