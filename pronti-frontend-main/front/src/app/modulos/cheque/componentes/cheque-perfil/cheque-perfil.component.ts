import {Component, Input} from '@angular/core';
import {ChequeResponseDto} from '../../servicios/dto/cheque.response-dto';
import {CHEQUE_TABS_ARRAY} from './constantes/cheque-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cheque-perfil',
  templateUrl: './cheque-perfil.component.html',
  styleUrls: ['./cheque-perfil.component.scss']
})
export class ChequePerfilComponent {
  @Input()
  registro: ChequeResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CHEQUE_TABS_ARRAY();

  constructor() {
  }

}
