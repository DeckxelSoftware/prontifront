import {Component, Input} from '@angular/core';
import {HistorialLaboralResponseDto} from '../../servicios/dto/historial-laboral.response-dto';
import {HISTORIAL_LABORAL_TABS_ARRAY} from './constantes/historial-laboral-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-historial-laboral-perfil',
  templateUrl: './historial-laboral-perfil.component.html',
  styleUrls: ['./historial-laboral-perfil.component.scss']
})
export class HistorialLaboralPerfilComponent {
  @Input()
  registro: HistorialLaboralResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = HISTORIAL_LABORAL_TABS_ARRAY();

  constructor() {
  }

}
