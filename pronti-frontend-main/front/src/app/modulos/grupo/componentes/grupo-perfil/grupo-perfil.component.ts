import {Component, Input} from '@angular/core';
import {GrupoResponseDto} from '../../servicios/dto/grupo.response-dto';
import {GRUPO_TABS_ARRAY} from './constantes/grupo-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-grupo-perfil',
  templateUrl: './grupo-perfil.component.html',
  styleUrls: ['./grupo-perfil.component.scss']
})
export class GrupoPerfilComponent {
  @Input()
  registro: GrupoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = GRUPO_TABS_ARRAY();

  constructor() {
  }

}
