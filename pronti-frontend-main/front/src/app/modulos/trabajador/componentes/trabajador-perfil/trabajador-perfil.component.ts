import {Component, Input} from '@angular/core';
import {TrabajadorResponseDto} from '../../servicios/dto/trabajador.response-dto';
import {TRABAJADOR_TABS_ARRAY} from './constantes/trabajador-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-trabajador-perfil',
  templateUrl: './trabajador-perfil.component.html',
  styleUrls: ['./trabajador-perfil.component.scss']
})
export class TrabajadorPerfilComponent {
  @Input()
  registro: TrabajadorResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = TRABAJADOR_TABS_ARRAY();
  @Input()
  registroTrabajador: TrabajadorResponseDto = {};

  constructor() {

  }

}
