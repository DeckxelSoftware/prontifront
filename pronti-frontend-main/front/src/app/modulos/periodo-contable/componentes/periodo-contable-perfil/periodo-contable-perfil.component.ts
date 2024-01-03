import {Component, Input} from '@angular/core';
import {PeriodoContableResponseDto} from '../../servicios/dto/periodo-contable.response-dto';
import {PERIODO_CONTABLE_TABS_ARRAY} from './constantes/periodo-contable-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-periodo-contable-perfil',
  templateUrl: './periodo-contable-perfil.component.html',
  styleUrls: ['./periodo-contable-perfil.component.scss']
})
export class PeriodoContablePerfilComponent {
  @Input()
  registro: PeriodoContableResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PERIODO_CONTABLE_TABS_ARRAY();

  constructor() {
  }

}
