import {Component, Input} from '@angular/core';
import {HistoricoPlanContratoResponseDto} from '../../servicios/dto/historico-plan-contrato.response-dto';
import {HISTORICO_PLAN_CONTRATO_TABS_ARRAY} from './constantes/historico-plan-contrato-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-historico-plan-contrato-perfil',
  templateUrl: './historico-plan-contrato-perfil.component.html',
  styleUrls: ['./historico-plan-contrato-perfil.component.scss']
})
export class HistoricoPlanContratoPerfilComponent {
  @Input()
  registro: HistoricoPlanContratoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = HISTORICO_PLAN_CONTRATO_TABS_ARRAY();

  constructor() {
  }

}
