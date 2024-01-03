import {Component, Input} from '@angular/core';
import {ClienteEnGrupoResponseDto} from '../../servicios/dto/cliente-en-grupo.response-dto';
import {CLIENTE_EN_GRUPO_TABS_ARRAY} from './constantes/cliente-en-grupo-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cliente-en-grupo-perfil',
  templateUrl: './cliente-en-grupo-perfil.component.html',
  styleUrls: ['./cliente-en-grupo-perfil.component.scss']
})
export class ClienteEnGrupoPerfilComponent {
  @Input()
  registro: ClienteEnGrupoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CLIENTE_EN_GRUPO_TABS_ARRAY();

  constructor() {
  }

}
