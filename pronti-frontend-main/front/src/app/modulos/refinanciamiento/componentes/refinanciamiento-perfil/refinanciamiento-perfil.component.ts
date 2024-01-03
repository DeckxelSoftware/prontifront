import {Component, Input} from '@angular/core';
import {RefinanciamientoResponseDto} from '../../servicios/dto/refinanciamiento.response-dto';
import {REFINANCIAMIENTO_TABS_ARRAY} from './constantes/refinanciamiento-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-refinanciamiento-perfil',
  templateUrl: './refinanciamiento-perfil.component.html',
  styleUrls: ['./refinanciamiento-perfil.component.scss']
})
export class RefinanciamientoPerfilComponent {
  @Input()
  registro: RefinanciamientoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = REFINANCIAMIENTO_TABS_ARRAY();

  constructor() {
  }

}
