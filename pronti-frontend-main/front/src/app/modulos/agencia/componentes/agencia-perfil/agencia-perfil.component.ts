import {Component, Input} from '@angular/core';
import {AgenciaResponseDto} from '../../servicios/dto/agencia.response-dto';
import {AGENCIA_TABS_ARRAY} from './constantes/agencia-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-agencia-perfil',
  templateUrl: './agencia-perfil.component.html',
  styleUrls: ['./agencia-perfil.component.scss']
})
export class AgenciaPerfilComponent {
  @Input()
  registro: AgenciaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = AGENCIA_TABS_ARRAY();

  constructor() {
  }

}
