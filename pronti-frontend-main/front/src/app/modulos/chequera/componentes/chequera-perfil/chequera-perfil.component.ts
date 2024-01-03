import {Component, Input} from '@angular/core';
import {ChequeraResponseDto} from '../../servicios/dto/chequera.response-dto';
import {CHEQUERA_TABS_ARRAY} from './constantes/chequera-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-chequera-perfil',
  templateUrl: './chequera-perfil.component.html',
  styleUrls: ['./chequera-perfil.component.scss']
})
export class ChequeraPerfilComponent {
  @Input()
  registro: ChequeraResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CHEQUERA_TABS_ARRAY();

  constructor() {
  }

}
