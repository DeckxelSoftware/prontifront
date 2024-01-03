import {Component, Input} from '@angular/core';
import {HistoricoRolResponseDto} from '../../servicios/dto/historico-rol.response-dto';
import {HISTORICO_ROL_TABS_ARRAY} from './constantes/historico-rol-tabs-array';
import { TabsArrays } from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-historico-rol-perfil',
  templateUrl: './historico-rol-perfil.component.html',
  styleUrls: ['./historico-rol-perfil.component.scss']
})
export class HistoricoRolPerfilComponent {
  @Input()
  registro: HistoricoRolResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = HISTORICO_ROL_TABS_ARRAY();

  constructor() {
  }

}
