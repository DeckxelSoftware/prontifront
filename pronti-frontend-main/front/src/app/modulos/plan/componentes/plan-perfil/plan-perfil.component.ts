import {Component, Input} from '@angular/core';
import {PlanResponseDto} from '../../servicios/dto/plan.response-dto';
import {PLAN_TABS_ARRAY} from './constantes/plan-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-plan-perfil',
  templateUrl: './plan-perfil.component.html',
  styleUrls: ['./plan-perfil.component.scss']
})
export class PlanPerfilComponent {
  @Input()
  registro: PlanResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PLAN_TABS_ARRAY();

  constructor() {
  }

}
