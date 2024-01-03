import {Component, Input} from '@angular/core';
import {RecursoResponseDto} from '../../servicios/dto/recurso.response-dto';
import {RECURSO_TABS_ARRAY} from './constantes/recurso-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-recurso-perfil',
  templateUrl: './recurso-perfil.component.html',
  styleUrls: ['./recurso-perfil.component.scss']
})
export class RecursoPerfilComponent {
  @Input()
  registro: RecursoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = RECURSO_TABS_ARRAY();

  constructor() {
  }

}
