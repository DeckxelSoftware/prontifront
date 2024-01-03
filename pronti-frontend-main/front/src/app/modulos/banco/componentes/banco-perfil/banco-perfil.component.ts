import {Component, Input} from '@angular/core';
import {BancoResponseDto} from '../../servicios/dto/banco.response-dto';
import {BANCO_TABS_ARRAY} from './constantes/banco-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-banco-perfil',
  templateUrl: './banco-perfil.component.html',
  styleUrls: ['./banco-perfil.component.scss']
})
export class BancoPerfilComponent {
  @Input()
  registro: BancoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = BANCO_TABS_ARRAY();

  constructor() {
  }

}
