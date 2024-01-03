import {Component, Input} from '@angular/core';
import {SupervisorResponseDto} from '../../servicios/dto/supervisor.response-dto';
import {SUPERVISOR_TABS_ARRAY} from './constantes/supervisor-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-supervisor-perfil',
  templateUrl: './supervisor-perfil.component.html',
  styleUrls: ['./supervisor-perfil.component.scss']
})
export class SupervisorPerfilComponent {
  @Input()
  registro: SupervisorResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = SUPERVISOR_TABS_ARRAY();

  constructor() {
  }

}
