import {Component, Input} from '@angular/core';
import {RolPermisoResponseDto} from '../../servicios/dto/rol-permiso.response-dto';
import {ROL_PERMISO_TABS_ARRAY} from './constantes/rol-permiso-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-rol-permiso-perfil',
  templateUrl: './rol-permiso-perfil.component.html',
  styleUrls: ['./rol-permiso-perfil.component.scss']
})
export class RolPermisoPerfilComponent {
  @Input()
  registro: RolPermisoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ROL_PERMISO_TABS_ARRAY();

  constructor() {
  }

}
