import {Component, Input} from '@angular/core';
import {PlanCuentasResponseDto} from '../../servicios/dto/plan-cuentas.response-dto';
import {PLAN_CUENTAS_TABS_ARRAY} from './constantes/plan-cuentas-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-plan-cuentas-perfil',
  templateUrl: './plan-cuentas-perfil.component.html',
  styleUrls: ['./plan-cuentas-perfil.component.scss']
})
export class PlanCuentasPerfilComponent {
  @Input()
  registro: PlanCuentasResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PLAN_CUENTAS_TABS_ARRAY();

  constructor() {
  }

}
