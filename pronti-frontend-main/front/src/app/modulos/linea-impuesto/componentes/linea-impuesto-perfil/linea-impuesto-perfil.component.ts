import {Component, Input} from '@angular/core';
import {LineaImpuestoResponseDto} from '../../servicios/dto/linea-impuesto.response-dto';
import {LINEA_IMPUESTO_TABS_ARRAY} from './constantes/linea-impuesto-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-linea-impuesto-perfil',
  templateUrl: './linea-impuesto-perfil.component.html',
  styleUrls: ['./linea-impuesto-perfil.component.scss']
})
export class LineaImpuestoPerfilComponent {
  @Input()
  registro: LineaImpuestoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = LINEA_IMPUESTO_TABS_ARRAY();

  constructor() {
  }

}
