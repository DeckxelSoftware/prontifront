import {Component, Input} from '@angular/core';
import {FiniquitoResponseDto} from '../../servicios/dto/finiquito.response-dto';
import {FINIQUITO_TABS_ARRAY} from './constantes/finiquito-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-finiquito-perfil',
  templateUrl: './finiquito-perfil.component.html',
  styleUrls: ['./finiquito-perfil.component.scss']
})
export class FiniquitoPerfilComponent {
  @Input()
  registro: FiniquitoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = FINIQUITO_TABS_ARRAY();

  constructor() {
  }

}
