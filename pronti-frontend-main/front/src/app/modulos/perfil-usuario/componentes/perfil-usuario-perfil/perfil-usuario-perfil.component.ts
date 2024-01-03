import {Component, Input} from '@angular/core';
import {PerfilUsuarioResponseDto} from '../../servicios/dto/perfil-usuario.response-dto';
import {PERFIL_USUARIO_TABS_ARRAY} from './constantes/perfil-usuario-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-perfil-usuario-perfil',
  templateUrl: './perfil-usuario-perfil.component.html',
  styleUrls: ['./perfil-usuario-perfil.component.scss']
})
export class PerfilUsuarioPerfilComponent {
  @Input()
  registro: PerfilUsuarioResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PERFIL_USUARIO_TABS_ARRAY();

  constructor() {
  }

}
