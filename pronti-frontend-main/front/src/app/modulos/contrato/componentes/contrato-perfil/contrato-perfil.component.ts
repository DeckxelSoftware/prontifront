import {Component, Input} from '@angular/core';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import {CONTRATO_TABS_ARRAY} from './constantes/contrato-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-contrato-perfil',
  templateUrl: './contrato-perfil.component.html',
  styleUrls: ['./contrato-perfil.component.scss']
})
export class ContratoPerfilComponent {
  @Input()
  registro: ContratoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CONTRATO_TABS_ARRAY();

  constructor() {
  }

}
