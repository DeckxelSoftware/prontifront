import {Component, Input} from '@angular/core';
import {ClienteResponseDto} from '../../servicios/dto/cliente.response-dto';
import {CLIENTE_TABS_ARRAY} from './constantes/cliente-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.scss']
})
export class ClientePerfilComponent {
  @Input()
  registro: ClienteResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CLIENTE_TABS_ARRAY();

  constructor() {
  }

}
