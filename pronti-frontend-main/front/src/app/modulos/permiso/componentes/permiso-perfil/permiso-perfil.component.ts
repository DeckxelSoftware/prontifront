import {Component, Input} from '@angular/core';
import {PermisoResponseDto} from '../../servicios/dto/permiso.response-dto';
import {PERMISO_TABS_ARRAY} from './constantes/permiso-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-permiso-perfil',
  templateUrl: './permiso-perfil.component.html',
  styleUrls: ['./permiso-perfil.component.scss']
})
export class PermisoPerfilComponent {
  @Input()
  registro: PermisoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PERMISO_TABS_ARRAY();

  constructor() {
  }

}
