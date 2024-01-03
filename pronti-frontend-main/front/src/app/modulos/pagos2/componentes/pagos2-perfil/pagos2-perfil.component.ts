import {Component, Input} from '@angular/core';
import {Pagos2ResponseDto} from '../../servicios/dto/pagos2.response-dto';
import {PAGOS_2_TABS_ARRAY} from './constantes/pagos2-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-pagos2-perfil',
  templateUrl: './pagos2-perfil.component.html',
  styleUrls: ['./pagos2-perfil.component.scss']
})
export class Pagos2PerfilComponent {
  @Input()
  registro: Pagos2ResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PAGOS_2_TABS_ARRAY();

  constructor() {
  }

}
