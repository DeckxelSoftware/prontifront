import {Component, Input} from '@angular/core';
import {Pagos1ResponseDto} from '../../servicios/dto/pagos1.response-dto';
import {PAGOS_1_TABS_ARRAY} from './constantes/pagos1-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-pagos1-perfil',
  templateUrl: './pagos1-perfil.component.html',
  styleUrls: ['./pagos1-perfil.component.scss']
})
export class Pagos1PerfilComponent {
  @Input()
  registro: Pagos1ResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PAGOS_1_TABS_ARRAY();

  constructor() {
  }

}
