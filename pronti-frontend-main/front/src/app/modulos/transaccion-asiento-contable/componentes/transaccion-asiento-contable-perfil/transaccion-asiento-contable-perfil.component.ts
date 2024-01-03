import {Component, Input} from '@angular/core';
import {TransaccionAsientoContableResponseDto} from '../../servicios/dto/transaccion-asiento-contable.response-dto';
import {TRANSACCION_ASIENTO_CONTABLE_TABS_ARRAY} from './constantes/transaccion-asiento-contable-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-transaccion-asiento-contable-perfil',
  templateUrl: './transaccion-asiento-contable-perfil.component.html',
  styleUrls: ['./transaccion-asiento-contable-perfil.component.scss']
})
export class TransaccionAsientoContablePerfilComponent {
  @Input()
  registro: TransaccionAsientoContableResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = TRANSACCION_ASIENTO_CONTABLE_TABS_ARRAY();

  constructor() {
  }

}
