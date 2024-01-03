import {Component, Input} from '@angular/core';
import {RubrosRolResponseDto} from '../../servicios/dto/rubros-rol.response-dto';
import {RUBROS_ROL_TABS_ARRAY} from './constantes/rubros-rol-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-rubros-rol-perfil',
  templateUrl: './rubros-rol-perfil.component.html',
  styleUrls: ['./rubros-rol-perfil.component.scss']
})
export class RubrosRolPerfilComponent {
  @Input()
  registro: RubrosRolResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = RUBROS_ROL_TABS_ARRAY();

  constructor() {
  }

}
