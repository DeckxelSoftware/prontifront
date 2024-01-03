import {Component, Input} from '@angular/core';
import {AsientoContableCabeceraResponseDto} from '../../servicios/dto/asiento-contable-cabecera.response-dto';
import {ASIENTO_CONTABLE_CABECERA_TABS_ARRAY} from './constantes/asiento-contable-cabecera-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-asiento-contable-cabecera-perfil',
  templateUrl: './asiento-contable-cabecera-perfil.component.html',
  styleUrls: ['./asiento-contable-cabecera-perfil.component.scss']
})
export class AsientoContableCabeceraPerfilComponent {
  @Input()
  registro: AsientoContableCabeceraResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ASIENTO_CONTABLE_CABECERA_TABS_ARRAY();

  constructor() {
  }

}
