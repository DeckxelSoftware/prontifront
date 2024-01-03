import {Component, Input} from '@angular/core';
import {RolUsuarioResponseDto} from '../../servicios/dto/rol-usuario.response-dto';
import {ROL_USUARIO_TABS_ARRAY} from './constantes/rol-usuario-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-rol-usuario-perfil',
  templateUrl: './rol-usuario-perfil.component.html',
  styleUrls: ['./rol-usuario-perfil.component.scss']
})
export class RolUsuarioPerfilComponent {
  @Input()
  registro: RolUsuarioResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ROL_USUARIO_TABS_ARRAY();

  constructor() {
  }

}
