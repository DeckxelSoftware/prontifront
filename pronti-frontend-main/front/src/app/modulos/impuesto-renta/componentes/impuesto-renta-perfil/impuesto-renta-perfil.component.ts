import {Component, Input} from '@angular/core';
import {ImpuestoRentaResponseDto} from '../../servicios/dto/impuesto-renta.response-dto';
import {IMPUESTO_RENTA_TABS_ARRAY} from './constantes/impuesto-renta-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-impuesto-renta-perfil',
  templateUrl: './impuesto-renta-perfil.component.html',
  styleUrls: ['./impuesto-renta-perfil.component.scss']
})
export class ImpuestoRentaPerfilComponent {
  @Input()
  registro: ImpuestoRentaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = IMPUESTO_RENTA_TABS_ARRAY();

  constructor() {
  }

}
