import {Component, Input} from '@angular/core';
import {UsuarioResponseDto} from '../../servicios/dto/usuario.response-dto';
import {USUARIO_TABS_ARRAY} from './constantes/usuario-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent {
  @Input()
  registro: UsuarioResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = USUARIO_TABS_ARRAY();

  constructor() {
  }

}
