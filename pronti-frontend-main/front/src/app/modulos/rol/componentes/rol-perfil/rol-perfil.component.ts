import {Component, Input} from '@angular/core';
import {RolResponseDto} from '../../servicios/dto/rol.response-dto';
import {ROL_TABS_ARRAY} from './constantes/rol-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-rol-perfil',
  templateUrl: './rol-perfil.component.html',
  styleUrls: ['./rol-perfil.component.scss']
})
export class RolPerfilComponent {
  @Input()
  registro: RolResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ROL_TABS_ARRAY();

  constructor() {
  }

}
